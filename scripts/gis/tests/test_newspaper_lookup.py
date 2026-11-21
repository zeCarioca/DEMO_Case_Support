"""Comprehensive automated test suite for Newspaper Lookup Service, 2-Tier Fallback, and DOL Risk Assessment."""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from api import app, get_db
from commute_risk import (
    calculate_haversine_distance_miles,
    calculate_estimated_driving_miles,
    evaluate_dol_commute_risk,
    CommuteRiskLevel,
)
from newspaper_lookup import NewspaperLookupService
from schema import Base, Newspaper, USPSDirectory, ZctaToCbsa
from seed_newspapers import SAMPLE_NEWSPAPERS, SAMPLE_USPS_PO_BOXES


@pytest.fixture(scope="module")
def test_db():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    with TestingSessionLocal() as session:
        sample_zctas = [
            # NYC Metro (M1)
            ZctaToCbsa(
                zip_code="10001",
                cbsa_code="35620",
                cbsa_name="New York-Newark-Jersey City, NY-NJ-PA",
                lsad_type="M1",
                overlap_area_sq_km=1.5,
                latitude=40.7501,
                longitude=-73.9967,
            ),
            # Los Angeles Metro (M1)
            ZctaToCbsa(
                zip_code="90210",
                cbsa_code="31080",
                cbsa_name="Los Angeles-Long Beach-Anaheim, CA",
                lsad_type="M1",
                overlap_area_sq_km=26.2,
                latitude=34.0901,
                longitude=-118.4065,
            ),
            # Bangor Micropolitan (M2)
            ZctaToCbsa(
                zip_code="04401",
                cbsa_code="12620",
                cbsa_name="Bangor, ME",
                lsad_type="M2",
                overlap_area_sq_km=114.3,
                latitude=44.8012,
                longitude=-68.7778,
            ),
            # Rural Tier 1 (< 50 driving miles to Alpine, TX: ~34 miles)
            ZctaToCbsa(
                zip_code="79842",
                cbsa_code=None,
                cbsa_name=None,
                lsad_type=None,
                overlap_area_sq_km=0.0,
                latitude=30.2050,
                longitude=-103.2400,
            ),
            # Rural Tier 2 (> 50 driving miles to any paper: ~89.5 miles)
            ZctaToCbsa(
                zip_code="79852",
                cbsa_code=None,
                cbsa_name=None,
                lsad_type=None,
                overlap_area_sq_km=0.0,
                latitude=29.3214,
                longitude=-103.6124,
            ),
        ]
        session.add_all(sample_zctas)

        for p in SAMPLE_NEWSPAPERS:
            session.add(Newspaper(**p))
        for u in SAMPLE_USPS_PO_BOXES:
            session.add(USPSDirectory(**u))

        session.commit()

    yield TestingSessionLocal
    Base.metadata.drop_all(engine)


@pytest.fixture
def service(test_db):
    session = test_db()
    try:
        yield NewspaperLookupService(session)
    finally:
        session.close()


@pytest.fixture
def client(test_db):
    def override_get_db():
        session = test_db()
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


# --- Unit Tests: Distance & DOL Risk Assessment Engine ---


def test_distance_and_circuity_calculation():
    """Verify Great Circle and road circuity calculations."""
    dist = calculate_haversine_distance_miles(40.7501, -73.9967, 40.7561, -73.9903)
    assert 0.4 <= dist <= 0.6
    driving = calculate_estimated_driving_miles(dist, circuity_factor=1.25)
    assert driving == round(dist * 1.25, 1)


def test_dol_risk_evaluation_conditions():
    """Test all statutory risk rules under 20 CFR § 656.3 & § 656.17."""
    # 1. Low risk: Same MSA under 75 driving miles
    r_msa_low = evaluate_dol_commute_risk(
        40.75, -73.99, 40.76, -73.98,
        job_cbsa="35620", paper_cbsa="35620", cbsa_type="M1"
    )
    assert r_msa_low.risk_level == CommuteRiskLevel.LOW
    assert "per se within normal commuting distance" in r_msa_low.dol_rationale

    # 2. Medium risk: Same MSA over 75 driving miles
    r_msa_med = evaluate_dol_commute_risk(
        40.75, -73.99, 41.80, -73.99,  # ~80 mi driving
        job_cbsa="35620", paper_cbsa="35620", cbsa_type="M1"
    )
    assert r_msa_med.risk_level == CommuteRiskLevel.MEDIUM
    assert "approaches the upper 50-mile threshold" in r_msa_med.dol_rationale

    # 3. Low risk: Rural under 35 driving miles
    r_rural_low = evaluate_dol_commute_risk(
        30.205, -103.24, 30.3585, -103.6613,  # ~34 mi driving
        job_cbsa=None, paper_cbsa=None, cbsa_type=None
    )
    assert r_rural_low.risk_level == CommuteRiskLevel.LOW
    assert "well within the 20-50 mile DOL" in r_rural_low.dol_rationale

    # 4. High risk: Over 55 driving miles
    r_high = evaluate_dol_commute_risk(
        29.3214, -103.6124, 30.3585, -103.6613,  # ~89.5 mi driving
        job_cbsa=None, paper_cbsa=None, cbsa_type=None
    )
    assert r_high.risk_level == CommuteRiskLevel.HIGH
    assert "exceeding normal commuting distance" in r_high.dol_rationale


# --- Service Integration Tests ---


def test_metropolitan_m1_resolution_with_commute_assessment(service):
    """Test resolution of NYC Metropolitan (M1) area with commute assessment."""
    res = service.resolve_zip("10001")
    assert res["status"] == "SUCCESS"
    assert res["metadata"]["area_type"] == "Metropolitan"
    assert res["metadata"]["cbsa_code"] == "35620"
    assert res["recommended_newspaper"]["name"] == "The New York Times"
    assert res["commute_assessment"]["risk_level"] == "LOW"
    assert "per se within normal commuting distance" in res["commute_assessment"]["dol_rationale"]
    assert "closest_alternative_newspaper" not in res


def test_micropolitan_m2_resolution_with_commute_assessment(service):
    """Test resolution of Bangor Micropolitan (M2) area."""
    res = service.resolve_zip("04401")
    assert res["status"] == "SUCCESS"
    assert res["metadata"]["area_type"] == "Micropolitan"
    assert res["metadata"]["cbsa_code"] == "12620"
    assert res["recommended_newspaper"]["name"] == "Bangor Daily News"
    assert res["commute_assessment"]["risk_level"] == "LOW"


def test_rural_tier1_local_commuting_radius(service):
    """Test Rural Tier 1 fallback for Marathon, TX (79842) within 50 driving miles."""
    res = service.resolve_zip("79842")
    assert res["status"] == "SUCCESS"
    assert res["metadata"]["is_rural_exception"] is True
    assert res["metadata"]["tier"] == "TIER_1_LOCAL"
    assert res["recommended_newspaper"]["name"] in ["The Alpine Avalanche", "The Big Bend Sentinel"]
    assert res["commute_assessment"]["estimated_driving_miles"] <= 50.0
    assert res["commute_assessment"]["risk_level"] in ["LOW", "MEDIUM"]


def test_rural_tier2_extended_regional_fallback_and_closest_alt(service):
    """Test Rural Tier 2 fallback for Terlingua, TX (79852) over 50 driving miles."""
    res = service.resolve_zip("79852")
    assert res["status"] == "SUCCESS"
    assert res["metadata"]["is_rural_exception"] is True
    assert res["metadata"]["tier"] == "TIER_2_REGIONAL"
    assert res["recommended_newspaper"]["name"] == "Houston Chronicle"
    assert res["commute_assessment"]["risk_level"] == "HIGH"
    assert "closest_alternative_newspaper" in res
    assert res["closest_alternative_newspaper"]["name"] in ["The Alpine Avalanche", "The Big Bend Sentinel"]
    assert res["closest_alternative_newspaper"]["estimated_driving_miles"] < res["recommended_newspaper"]["estimated_driving_miles"]


def test_po_box_crosswalk_resolution(service):
    """Test PO Box 90213 falls back to parent ZCTA 90210 -> LA Metro."""
    res = service.resolve_zip("90213")
    assert res["status"] == "SUCCESS"
    assert res["is_po_box_fallback"] is True
    assert res["resolved_zip"] == "90210"
    assert res["metadata"]["cbsa_code"] == "31080"
    assert res["recommended_newspaper"]["name"] == "Los Angeles Times"
    assert res["commute_assessment"]["risk_level"] == "LOW"


# --- HTTP API Integration Tests ---


def test_api_resolve_success_metro(client):
    """Test GET /api/newspapers/resolve with Metro ZIP."""
    response = client.get("/api/newspapers/resolve?zip_code=10001")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["commute_assessment"]["risk_level"] == "LOW"


def test_api_resolve_rural_tier2_high_risk(client):
    """Test POST /api/newspapers/resolve with Rural Tier 2 ZIP returning HIGH risk and closest alt."""
    response = client.post("/api/newspapers/resolve", json={"zip_code": "79852"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["commute_assessment"]["risk_level"] == "HIGH"
    assert data["closest_alternative_newspaper"] is not None
    assert "exceeding normal commuting distance" in data["commute_assessment"]["dol_rationale"]


def test_api_resolve_bad_request(client):
    """Test GET /api/newspapers/resolve with invalid ZIP."""
    response = client.get("/api/newspapers/resolve?zip_code=abc")
    assert response.status_code == 400
    assert "Input must be exactly 5 numeric digits" in response.json()["detail"]


def test_api_resolve_not_found(client):
    """Test GET /api/newspapers/resolve with unknown ZIP."""
    response = client.get("/api/newspapers/resolve?zip_code=99999")
    assert response.status_code == 404

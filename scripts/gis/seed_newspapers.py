"""Seed sample newspapers and USPS PO Box mappings into the database."""

import uuid
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from schema import Base, Newspaper, USPSDirectory


SAMPLE_NEWSPAPERS = [
    # Metropolitan Area (M1) Publications
    {
        "id": str(uuid.uuid4()),
        "name": "The New York Times",
        "cbsa_code": "35620",
        "headquarters_city": "New York",
        "headquarters_state": "NY",
        "headquarters_zip": "10018",
        "sunday_circulation": 1500000,
        "weekday_circulation": 800000,
        "has_sunday_print_edition": True,
        "is_primary_metro_daily": True,
        "latitude": 40.7561,
        "longitude": -73.9903,
    },
    {
        "id": str(uuid.uuid4()),
        "name": "New York Post",
        "cbsa_code": "35620",
        "headquarters_city": "New York",
        "headquarters_state": "NY",
        "headquarters_zip": "10036",
        "sunday_circulation": 350000,
        "weekday_circulation": 400000,
        "has_sunday_print_edition": True,
        "is_primary_metro_daily": False,
        "latitude": 40.7589,
        "longitude": -73.9851,
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Los Angeles Times",
        "cbsa_code": "31080",
        "headquarters_city": "El Segundo",
        "headquarters_state": "CA",
        "headquarters_zip": "90245",
        "sunday_circulation": 750000,
        "weekday_circulation": 450000,
        "has_sunday_print_edition": True,
        "is_primary_metro_daily": True,
        "latitude": 33.9192,
        "longitude": -118.4165,
    },
    # Micropolitan Area (M2) Publications
    {
        "id": str(uuid.uuid4()),
        "name": "Bangor Daily News",
        "cbsa_code": "12620",
        "headquarters_city": "Bangor",
        "headquarters_state": "ME",
        "headquarters_zip": "04401",
        "sunday_circulation": 45000,
        "weekday_circulation": 38000,
        "has_sunday_print_edition": True,
        "is_primary_metro_daily": True,
        "latitude": 44.8012,
        "longitude": -68.7778,
    },
    # Rural Publications (Outside any CBSA)
    {
        "id": str(uuid.uuid4()),
        "name": "The Big Bend Sentinel",
        "cbsa_code": None,
        "headquarters_city": "Marfa",
        "headquarters_state": "TX",
        "headquarters_zip": "79843",
        "sunday_circulation": 6500,
        "weekday_circulation": 6500,
        "has_sunday_print_edition": False,
        "is_primary_metro_daily": False,
        "latitude": 30.3094,
        "longitude": -104.0209,
    },
    {
        "id": str(uuid.uuid4()),
        "name": "The Alpine Avalanche",
        "cbsa_code": None,
        "headquarters_city": "Alpine",
        "headquarters_state": "TX",
        "headquarters_zip": "79830",
        "sunday_circulation": 4200,
        "weekday_circulation": 4200,
        "has_sunday_print_edition": False,
        "is_primary_metro_daily": False,
        "latitude": 30.3585,
        "longitude": -103.6613,
    },
    # Statewide Record Publication
    {
        "id": str(uuid.uuid4()),
        "name": "Houston Chronicle",
        "cbsa_code": "26420",
        "headquarters_city": "Houston",
        "headquarters_state": "TX",
        "headquarters_zip": "77002",
        "sunday_circulation": 850000,
        "weekday_circulation": 500000,
        "has_sunday_print_edition": True,
        "is_primary_metro_daily": True,
        "latitude": 29.7604,
        "longitude": -95.3698,
    },
]

SAMPLE_USPS_PO_BOXES = [
    # PO Box 90213 in Beverly Hills (parent physical ZCTA 90210)
    {
        "zip_code": "90213",
        "parent_zcta": "90210",
        "city": "Beverly Hills",
        "state": "CA",
        "latitude": 34.0736,
        "longitude": -118.4004,
    },
    # PO Box 10008 in NYC (parent physical ZCTA 10001)
    {
        "zip_code": "10008",
        "parent_zcta": "10001",
        "city": "New York",
        "state": "NY",
        "latitude": 40.7501,
        "longitude": -73.9967,
    },
]


def seed_database(db_url: str = "sqlite:///newspaper_db.sqlite"):
    engine = create_engine(db_url)
    Base.metadata.create_all(engine)

    with Session(engine) as session:
        # Clear existing
        session.query(Newspaper).delete()
        session.query(USPSDirectory).delete()

        for paper_data in SAMPLE_NEWSPAPERS:
            session.add(Newspaper(**paper_data))

        for usps_data in SAMPLE_USPS_PO_BOXES:
            session.add(USPSDirectory(**usps_data))

        session.commit()
    print(f"Seeded {len(SAMPLE_NEWSPAPERS)} newspapers and {len(SAMPLE_USPS_PO_BOXES)} USPS PO Box mappings into '{db_url}'.")


if __name__ == "__main__":
    seed_database()

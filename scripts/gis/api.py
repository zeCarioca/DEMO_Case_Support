"""FastAPI application exposing the refactored newspaper resolution endpoint with DOL commute assessment."""

from typing import Any, Dict, List, Optional
from fastapi import Depends, FastAPI, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from commute_risk import CommuteAssessment
from newspaper_lookup import NewspaperLookupService
from schema import Base

DATABASE_URL = "sqlite:///newspaper_db.sqlite"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI(
    title="Census CBSA Newspaper Resolution API",
    description="Resolves highest-circulation newspaper for a 5-digit ZIP based on Census CBSA (M1/M2), 2-tier rural fallback, and DOL commute risk.",
    version="2.0.0",
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class ResolveRequest(BaseModel):
    zip_code: str = Field(..., description="5-digit US ZIP Code", examples=["10001"])


class NewspaperItem(BaseModel):
    id: str
    name: str
    cbsa_code: Optional[str] = None
    headquarters_city: Optional[str] = None
    headquarters_state: str
    headquarters_zip: Optional[str] = None
    sunday_circulation: int
    weekday_circulation: int
    is_primary_metro_daily: bool
    has_sunday_print_edition: bool
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    straight_line_miles: Optional[float] = None
    estimated_driving_miles: Optional[float] = None


class ResolveResponse(BaseModel):
    status: str
    input_zip: str
    resolved_zip: str
    is_po_box_fallback: bool
    metadata: Dict[str, Any]
    recommended_newspaper: NewspaperItem
    commute_assessment: Optional[CommuteAssessment] = None
    closest_alternative_newspaper: Optional[NewspaperItem] = None
    alternatives: List[NewspaperItem] = []


@app.get("/api/newspapers/resolve", response_model=ResolveResponse)
def resolve_newspaper(
    zip_code: str = Query(..., description="5-digit U.S. ZIP Code", examples=["10001"]),
    db: Session = Depends(get_db),
) -> Dict[str, Any]:
    """Resolve the mandated PERM newspaper of highest circulation for a given 5-digit ZIP code."""
    service = NewspaperLookupService(db)
    try:
        return service.resolve_zip(zip_code)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except (KeyError, LookupError) as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Internal error: {str(e)}")


@app.post("/api/newspapers/resolve", response_model=ResolveResponse)
def resolve_newspaper_post(
    req: ResolveRequest,
    db: Session = Depends(get_db),
) -> Dict[str, Any]:
    """Resolve the mandated PERM newspaper via JSON body."""
    service = NewspaperLookupService(db)
    try:
        return service.resolve_zip(req.zip_code)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except (KeyError, LookupError) as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Internal error: {str(e)}")


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "newspaper-resolution", "version": "2.0.0"}

"""Database models for ZCTA-to-CBSA mapping and Newspaper resolution."""

from typing import Optional
import uuid
from sqlalchemy import Boolean, Column, Float, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class ZctaToCbsa(Base):
    __tablename__ = "zcta_to_cbsa"

    zip_code: Mapped[str] = mapped_column(String(5), primary_key=True, index=True)
    cbsa_code: Mapped[Optional[str]] = mapped_column(String(5), nullable=True, index=True)
    cbsa_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    lsad_type: Mapped[Optional[str]] = mapped_column(String(2), nullable=True)  # 'M1' = Metro, 'M2' = Micro
    overlap_area_sq_km: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    latitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    longitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)


class Newspaper(Base):
    __tablename__ = "newspapers"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    cbsa_code: Mapped[Optional[str]] = mapped_column(String(5), nullable=True, index=True)
    headquarters_city: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    headquarters_state: Mapped[str] = mapped_column(String(2), nullable=False, index=True)
    headquarters_zip: Mapped[Optional[str]] = mapped_column(String(5), nullable=True, index=True)
    sunday_circulation: Mapped[int] = mapped_column(Integer, default=0, index=True)
    weekday_circulation: Mapped[int] = mapped_column(Integer, default=0)
    has_sunday_print_edition: Mapped[bool] = mapped_column(Boolean, default=True)
    is_primary_metro_daily: Mapped[bool] = mapped_column(Boolean, default=False)
    latitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    longitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    @property
    def zip_code(self) -> Optional[str]:
        return self.headquarters_zip


class USPSDirectory(Base):
    __tablename__ = "usps_directory"

    zip_code: Mapped[str] = mapped_column(String(5), primary_key=True, index=True)
    parent_zcta: Mapped[str] = mapped_column(String(5), nullable=False, index=True)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str] = mapped_column(String(2), nullable=False)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)

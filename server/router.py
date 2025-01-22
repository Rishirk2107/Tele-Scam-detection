from fastapi import APIRouter
from routers.api.analysis import router as analysis
from routers.api.overview import router as overview
from routers.api.scam_channels import router as scam_channels
from routers.api.scam_trends import router as scam_trends
from routers.api.scam_types import router as scam_types
from routers.api.scammers import router as scammers

router = APIRouter()

router.include_router(analysis,prefix="/api",tags=["Analysis"])
router.include_router(overview,prefix="/api",tags=["Overview"])
router.include_router(scam_channels,prefix="/api",tags=["Scam Channles"])
router.include_router(scam_trends,prefix="/api",tags=["Scam Trends"])
router.include_router(scam_types,prefix="/api",tags=["Scam Types"])
router.include_router(scammers,prefix="/api",tags=["Scammers"])
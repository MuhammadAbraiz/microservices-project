from fastapi import APIRouter, Depends
import service
from models import UserCreate, LoginRequest
from shared.schemas import models as shared_models

router = APIRouter()

@router.post("/signup", response_model=shared_models.User)
def signup(user: UserCreate):
    return service.signup(user)

@router.post("/login")
def login(user: LoginRequest):
    return service.login(user)

@router.get("/healthz")
def healthz():
    return {"status": "ok"}

from fastapi import APIRouter, HTTPException, Depends
import service
from models import UserCreate, LoginRequest
from shared.schemas import models as shared_models

router = APIRouter()

@router.post("/signup", response_model=shared_models.User)
def signup(user: UserCreate):
    try:
        return service.signup(user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
def login(user: LoginRequest):
    try:
        return service.login(user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/healthz")
def healthz():
    return {"status": "ok"}

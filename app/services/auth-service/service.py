from models import UserCreate, LoginRequest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'shared', 'schemas'))
import models as shared_models

# In-memory storage
users = {}
next_user_id = 1

def signup(user_create: UserCreate) -> shared_models.User:
    global next_user_id
    user = shared_models.User(id=next_user_id, username=user_create.username)
    users[user.username] = user
    next_user_id += 1
    return user

def login(login_request: LoginRequest):
    # In a real application, you would verify the password
    if login_request.username in users:
        return {"token": "fake-jwt-token"}
    return {"error": "Invalid credentials"}

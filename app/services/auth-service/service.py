from models import UserCreate, LoginRequest
from shared.schemas.models import User

# In-memory storage
users = {}
next_user_id = 1

def signup(user_create: UserCreate) -> User:
    global next_user_id
    if user_create.username in users:
        raise ValueError('Username already exists')
    user = User(id=next_user_id, username=user_create.username)
    users[user.username] = user
    next_user_id += 1
    return user

def login(login_request: LoginRequest) -> User:
    # In a real application, you would verify the password
    if login_request.username in users:
        return users[login_request.username]
    raise ValueError('Invalid username or password')

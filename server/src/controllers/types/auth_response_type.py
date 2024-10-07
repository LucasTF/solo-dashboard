from typing import TypedDict


class AuthResponse(TypedDict):
    id: int
    name: str
    email: str
    is_admin: bool
    authorization: str

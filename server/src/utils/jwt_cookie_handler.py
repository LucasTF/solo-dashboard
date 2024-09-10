from datetime import timedelta
from flask import Response

from src.config.environment import jwt_env


def create_jwt_cookie(response: Response, token: str, is_admin: bool = False) -> Response:
    cookie_name = "auth_token_admin" if is_admin == True else "auth_token"

    response.set_cookie(key=cookie_name, value=token, httponly=True, max_age=timedelta(hours=int(jwt_env["JWT_HOURS"])))

    return response
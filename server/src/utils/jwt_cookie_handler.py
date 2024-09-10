from datetime import timedelta
from flask import Response

from src.config.environment import jwt_env


def create_jwt_cookie(response: Response, token: str) -> Response:
    response.set_cookie(key="auth_token", value=token, httponly=True, max_age=timedelta(hours=int(jwt_env["JWT_HOURS"])))

    return response
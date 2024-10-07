from flask import request

from src.errors.unauthenticated_error import UnauthenticatedError
from src.errors.unauthorized_error import UnauthorizedError
from src.services.jwt_service import JwtService


def check_authentication():
    token = request.cookies.get("auth_token")

    if not token:
        raise UnauthenticatedError()

    jwt_service = JwtService()
    decoded_token = jwt_service.decode_jwt_token(token)

    return decoded_token


def check_authorization():
    decoded_token = check_authentication()
    is_authorized = decoded_token.get("is_admin")

    if is_authorized == False or is_authorized is None:
        raise UnauthorizedError()

    return decoded_token

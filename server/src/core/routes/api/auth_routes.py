from flask import Blueprint, jsonify, make_response, request

from src.controllers.types.auth_response_type import AuthResponse
from src.core.composers.auth_composer import compose_auth
from src.utils.jwt_cookie_handler import create_jwt_cookie
from src.views.api.types.http_request import HttpRequest


auth_route = Blueprint("auth_routes", __name__)


@auth_route.route("/login", methods=["POST"])
def login():
    http_request = HttpRequest(body=request.json)
    view = compose_auth()
    response = view.handle(http_request)

    body: AuthResponse = response.body.get("data")

    resp = make_response(
        jsonify(
            {
                "name": body.get("name"),
                "email": body.get("email"),
                "is_admin": body.get("is_admin"),
            }
        ),
        response.status_code,
    )
    resp = create_jwt_cookie(resp, body.get("authorization"))

    return resp

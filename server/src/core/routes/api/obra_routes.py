from flask import Blueprint, jsonify, request

from src.config.constants import DEFAULT_ENTRIES_PER_PAGE
from src.core.composers.obra_composer import ObraAction, compose_obra
from src.core.middlewares.auth_middleware import (
    check_authentication,
    check_authorization,
)
from src.utils.query_treatment import get_positive_query_param
from src.views.api.types.http_request import HttpRequest


obra_route = Blueprint("obra_routes", __name__)


@obra_route.route("/obras", methods=["GET"])
def list_obras():
    check_authentication()

    page = request.args.get("page")
    entries_per_page = request.args.get("entries_per_page")
    search = request.args.get("search")

    http_request = HttpRequest(
        params={
            "page": get_positive_query_param(page, 1),
            "entries_per_page": get_positive_query_param(
                entries_per_page, DEFAULT_ENTRIES_PER_PAGE
            ),
            "search": search,
        }
    )

    view = compose_obra(ObraAction.LIST)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code


@obra_route.route("/obras", methods=["POST"])
def create_obra():
    check_authorization()

    http_request = HttpRequest(body=request.json)
    view = compose_obra(ObraAction.CREATE)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code


@obra_route.route("/obras/<path:identifier>", methods=["GET"])
def find_obra(identifier: str):
    check_authentication()

    http_request = HttpRequest(params={"identifier": identifier})
    view = compose_obra(ObraAction.FIND)
    http_response = view.handle(http_request)

    return http_response.body, http_response.status_code


@obra_route.route("/obras/<int:id>", methods=["PUT"])
def update_obra(id: int):
    check_authorization()

    http_request = HttpRequest(params={"id": id}, body=request.json)
    view = compose_obra(ObraAction.UPDATE)
    http_response = view.handle(http_request)

    return "", http_response.status_code

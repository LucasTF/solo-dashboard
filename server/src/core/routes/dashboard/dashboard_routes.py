from flask import Blueprint, redirect, render_template, send_file
from jwt import DecodeError, ExpiredSignatureError

from src.config.dashboard import dashboard_template
from src.core.middlewares.auth_middleware import check_authentication
from src.errors.unauthenticated_error import UnauthenticatedError
from src.errors.unauthorized_error import UnauthorizedError

# Routes

from src.core.routes.dashboard.auth_routes import dashboard_auth_route

dashboard_route = Blueprint(
    "dashboard_routes",
    __name__,
    template_folder=dashboard_template,
    static_folder=dashboard_template,
    url_prefix="/dashboard",
)

# Errors

dashboard_route.register_error_handler(
    UnauthenticatedError, lambda _: redirect("/dashboard/login")
)
dashboard_route.register_error_handler(
    DecodeError, lambda _: redirect("/dashboard/login")
)
dashboard_route.register_error_handler(
    ExpiredSignatureError, lambda _: redirect("/dashboard/login")
)
dashboard_route.register_error_handler(
    UnauthorizedError, lambda _: redirect("/dashboard")
)

dashboard_route.register_blueprint(dashboard_auth_route)


@dashboard_route.route("/", methods=["GET"])
def index():
    check_authentication()

    return render_template("dashboard.html")


# Obras
@dashboard_route.route("/obras", methods=["GET"])
def obras():
    check_authentication()

    return render_template("/dashboard/obras.html")


@dashboard_route.route("/obras.txt", methods=["GET"])
def obras_txt():
    return send_file(f"{dashboard_template}/dashboard/obras.txt")


# New Obra
@dashboard_route.route("/obras/new", methods=["GET"])
def new_obra():
    check_authentication()

    return render_template("/dashboard/obras/new.html")


@dashboard_route.route("/obras/new.txt", methods=["GET"])
def new_obra_txt():
    return send_file(f"{dashboard_template}/dashboard/obras/new.txt")

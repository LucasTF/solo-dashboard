from flask import Blueprint, redirect, render_template, send_file

from src.config.dashboard import dashboard_template
from src.core.middlewares.auth_middleware import check_authentication
from src.errors.unauthenticated_error import UnauthenticatedError


dashboard_auth_route = Blueprint("dashboard_auth_routes", __name__)


# Login
@dashboard_auth_route.route("/login", methods=["GET"])
def login():
    try:
        check_authentication()
        return redirect("/dashboard")
    except UnauthenticatedError:
        return render_template("/dashboard/login.html")


@dashboard_auth_route.route("/login.txt", methods=["GET"])
def login_txt():
    return send_file(f"{dashboard_template}/dashboard/login.txt")

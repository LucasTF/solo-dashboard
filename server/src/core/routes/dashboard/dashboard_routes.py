import os
from flask import Blueprint, redirect, render_template, send_file

from src.core.middlewares.auth_middleware import check_authentication
from src.errors.unauthenticated_error import UnauthenticatedError

template_dir = os.getcwd() + "/src/views/out"
dashboard_route = Blueprint(
    "dashboard_routes",
    __name__,
    template_folder=template_dir,
    static_folder=template_dir,
    url_prefix="/dashboard",
)


@dashboard_route.route("/", methods=["GET"])
def index():
    try:
        check_authentication()
    except UnauthenticatedError:
        return redirect("/dashboard/login")

    return render_template("dashboard.html")


# Login
@dashboard_route.route("/login", methods=["GET"])
def login():
    try:
        check_authentication()
        return redirect("/dashboard")
    except UnauthenticatedError:
        return render_template("/dashboard/login.html")


@dashboard_route.route("/login.txt", methods=["GET"])
def login_txt():
    return send_file(f"{template_dir}/dashboard/login.txt")


# Obras
@dashboard_route.route("/obras", methods=["GET"])
def obras():
    try:
        check_authentication()
    except UnauthenticatedError:
        return redirect("/dashboard/login")

    return render_template("/dashboard/obras.html")


@dashboard_route.route("/obras.txt", methods=["GET"])
def obras_txt():
    return send_file(f"{template_dir}/dashboard/obras.txt")


# New Obra
@dashboard_route.route("/obras/new", methods=["GET"])
def new_obra():
    try:
        check_authentication()
    except UnauthenticatedError:
        return redirect("/dashboard/login")

    return render_template("/dashboard/obras/new.html")


@dashboard_route.route("/obras/new.txt", methods=["GET"])
def new_obra_txt():
    return send_file(f"{template_dir}/dashboard/obras/new.txt")

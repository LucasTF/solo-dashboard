import os
from flask import Blueprint, abort, send_file

from src.config.dashboard import dashboard_template

static_content = Blueprint("static_content", __name__)


# Favicon
@static_content.route("/favicon.ico")
def favicon():
    return send_file(dashboard_template + "/favicon.ico")


# Static (CSS/JS)
@static_content.route("/_next/<path:subpath>")
def get_static(subpath):
    return send_file(f"{dashboard_template}/_next/{subpath}")


# Images
@static_content.route("/img/<path:subpath>")
def get_image(subpath):
    if os.path.isfile(f"{dashboard_template}/img/{subpath}"):
        return send_file(f"{dashboard_template}/img/{subpath}")

    abort(404)


# Routes TXT
@static_content.route("/dashboard.txt")
def dashboard_txt():
    return send_file(dashboard_template + "/dashboard.txt")

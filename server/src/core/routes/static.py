import os
from flask import Blueprint, abort, send_file

dir = os.getcwd() + "/src/views/out"
static_content = Blueprint("static_content", __name__)


# Favicon
@static_content.route("/favicon.ico")
def favicon():
    return send_file(dir + "/favicon.ico")

# Static (CSS/JS)
@static_content.route("/_next/<path:subpath>")
def get_static(subpath):
    return send_file(f"{dir}/_next/{subpath}")

# Images
@static_content.route("/img/<path:subpath>")
def get_image(subpath):
    if os.path.isfile(f"{dir}/img/{subpath}"):
        return send_file(f"{dir}/img/{subpath}")

    abort(404)

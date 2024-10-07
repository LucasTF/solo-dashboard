import os
from flask import Blueprint, abort, send_file

static_content = Blueprint("static_content", __name__, template_folder="out")


# Favicon
@static_content.route("/favicon.ico")
def favicon():
    return send_file("out/favicon.ico")


# Images
@static_content.route("/img/<path:subpath>")
def get_image(subpath):
    if os.path.isfile(f"out/img/{subpath}"):
        return send_file(f"out/img/{subpath}")

    abort(404)

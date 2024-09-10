from src.controllers.auth_controller import AuthController
from src.database.connector import db_connector
from src.models.repositories.usuario_repository import UsuarioRepository
from src.views.api.auth.auth_login_view import AuthLoginView
from src.views.api.interfaces.view_interface import ViewInterface


def compose_auth() -> ViewInterface:

    repository = UsuarioRepository(db_connector)
    controller = AuthController(repository)
    view = AuthLoginView(controller)

    return view
from enum import Enum

from src.database.connector import db_connector
from src.models.repositories.usuario_repository import UsuarioRepository
from src.controllers.usuario_controller import UsuarioController

from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.usuarios.usuario_create_view import UsuarioCreateView
from src.views.api.usuarios.usuario_delete_view import UsuarioDeleteView
from src.views.api.usuarios.usuario_find_view import UsuarioFindView
from src.views.api.usuarios.usuario_list_view import UsuarioListView
from src.views.api.usuarios.usuario_update_password_view import UsuarioUpdatePasswordView
from src.views.api.usuarios.usuario_update_view import UsuarioUpdateView


class UsuarioAction(Enum):
    CREATE = 1,
    FIND = 2,
    LIST = 3,
    DELETE = 4,
    UPDATE = 5,
    UPDATE_PASSWORD = 6,

def compose_usuario(action: UsuarioAction) -> ViewInterface:

    repository = UsuarioRepository(db_connector)
    controller = UsuarioController(repository)

    match action:
        case UsuarioAction.CREATE:
            return UsuarioCreateView(controller)
        case UsuarioAction.FIND:
            return UsuarioFindView(controller)
        case UsuarioAction.LIST:
            return UsuarioListView(controller)
        case UsuarioAction.DELETE:
            return UsuarioDeleteView(controller)
        case UsuarioAction.UPDATE:
            return UsuarioUpdateView(controller)
        case UsuarioAction.UPDATE_PASSWORD:
            return UsuarioUpdatePasswordView(controller)
        case _:
            raise Exception('Ação para <Usuario> não encontrada.')
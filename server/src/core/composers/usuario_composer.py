from enum import Enum

from src.controllers.usuario_controller import UsuarioController
from src.database.connector import db_connector
from src.models.repositories.usuario_repository import UsuarioRepository
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.usuarios.usuario_create_view import UsuarioCreateView
from src.views.api.usuarios.usuario_list_view import UsuarioListView

class UsuarioAction(Enum):
    CREATE = 1,
    FIND_BY_ID = 2,
    FIND_BY_EMAIL = 3,
    LIST = 4,
    DELETE = 5,
    UPDATE_PASSWORD = 6,
    UPDATE = 7

def compose_usuario(action: UsuarioAction) -> ViewInterface:

    repository = UsuarioRepository(db_connector)
    controller = UsuarioController(repository)

    match action:
        case UsuarioAction.CREATE:
            return UsuarioCreateView(controller)
        case UsuarioAction.FIND_BY_ID:
            raise NotImplementedError('Ação não implementada.')
        case UsuarioAction.FIND_BY_EMAIL:
            raise NotImplementedError('Ação não implementada.')
        case UsuarioAction.LIST:
            return UsuarioListView(controller)
        case UsuarioAction.DELETE:
            raise NotImplementedError('Ação não implementada.')
        case UsuarioAction.UPDATE_PASSWORD:
            raise NotImplementedError('Ação não implementada.')
        case UsuarioAction.UPDATE:
            raise NotImplementedError('Ação não implementada.')
        case _:
            raise Exception('Ação para <Usuario> não encontrada.')
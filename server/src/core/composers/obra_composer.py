from enum import Enum

from src.controllers.obra_controller import ObraController
from src.database.connector import db_connector
from src.errors.invalid_operation_error import InvalidOperationError
from src.models.repositories.obra_repository import ObraRepository
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.obras.obra_create_view import ObraCreateView
from src.views.api.obras.obra_find_view import ObraFindView
from src.views.api.obras.obra_list_view import ObraListView
from src.views.api.obras.obra_update_view import ObraUpdateView


class ObraAction(Enum):
    CREATE = 1
    FIND = 2
    LIST = 3
    UPDATE = 4

def compose_obra(action: ObraAction) -> ViewInterface:
    repository = ObraRepository(db_connector)
    controller = ObraController(repository)

    match action:
        case ObraAction.CREATE:
            return ObraCreateView(controller)
        case ObraAction.FIND:
            return ObraFindView(controller)
        case ObraAction.LIST:
            return ObraListView(controller)
        case ObraAction.UPDATE:
            return ObraUpdateView(controller)
        case _:
            raise InvalidOperationError("Ação para <Obra> não encontrada.")
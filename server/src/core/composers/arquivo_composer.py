from enum import Enum

from src.controllers.arquivo_controller import ArquivoController
from src.database.connector import db_connector
from src.errors.invalid_operation_error import InvalidOperationError
from src.models.repositories.arquivo_repository import ArquivoRepository
from src.models.repositories.obra_repository import ObraRepository
from src.views.api.arquivos.arquivo_create_view import ArquivoCreateView
from src.views.api.arquivos.arquivo_find_by_obra_id import ArquivoFindByObraId
from src.views.api.interfaces.view_interface import ViewInterface


class ArquivoAction(Enum):
    CREATE = 1
    FIND_BY_ID = 2
    FIND_BY_OBRA_ID = 3
    LIST_LATEST = 4
    DELETE = 5


def compose_arquivo(action: ArquivoAction) -> ViewInterface:
    arquivo_repository = ArquivoRepository(db_connector)
    obra_repository = ObraRepository(db_connector)
    controller = ArquivoController(arquivo_repository, obra_repository)

    match action:
        case ArquivoAction.CREATE:
            return ArquivoCreateView(controller)
        case ArquivoAction.FIND_BY_ID:
            return NotImplementedError()
        case ArquivoAction.FIND_BY_OBRA_ID:
            return ArquivoFindByObraId(controller)
        case ArquivoAction.LIST_LATEST:
            return NotImplementedError()
        case ArquivoAction.DELETE:
            return NotImplementedError()
        case _:
            raise InvalidOperationError("Ação para <Arquivo> não encontrada.")

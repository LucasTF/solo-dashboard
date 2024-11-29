from typing import List
from werkzeug.datastructures import FileStorage

from src.controllers.interfaces.arquivo_controller_interface import (
    ArquivoControllerInterface,
)
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ArquivoCreateView(ViewInterface):
    def __init__(self, controller: ArquivoControllerInterface):
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        obra_id = http_request.params.get("id")
        files: List[FileStorage] = http_request.body.get("files")

        inserted_ids = self.__controller.create(obra_id, files)
        body_response = []

        for id in inserted_ids:
            arquivo = self.__controller.find_by_id(id)
            body_response.append(arquivo.to_dict())

        return HttpResponse(status_code=201, body=body_response)

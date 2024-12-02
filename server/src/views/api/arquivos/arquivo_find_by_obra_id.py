from src.controllers.interfaces.arquivo_controller_interface import (
    ArquivoControllerInterface,
)
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ArquivoFindByObraId(ViewInterface):
    def __init__(self, controller: ArquivoControllerInterface):
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        obra_id = http_request.params.get("id")

        arquivos = self.__controller.find_by_obra_id(obra_id)

        data = []

        for arquivo in arquivos:
            data.append(arquivo.to_dict())

        body_response = {"data": data}

        return HttpResponse(status_code=201, body=body_response)

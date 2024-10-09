from src.controllers.interfaces.obra_controller_interface import ObraControllerInterface
from src.validators.valid_response import ValidResponse
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ObraCreateView(ViewInterface):
    def __init__(self, controller: ObraControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        obra_info = http_request.body
        self.__controller.create(obra_info)

        body_response = ValidResponse(message="Obra criada com sucesso.").model_dump(
            exclude_none=True
        )

        return HttpResponse(status_code=201, body=body_response)

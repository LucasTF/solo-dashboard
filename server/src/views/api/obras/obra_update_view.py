from src.controllers.interfaces.obra_controller_interface import ObraControllerInterface
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ObraUpdateView(ViewInterface):
    def __init__(self, controller: ObraControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        obra_id = http_request.params.get("id")
        request_body = http_request.body

        self.__controller.update(obra_id, request_body)

        return HttpResponse(status_code=204)

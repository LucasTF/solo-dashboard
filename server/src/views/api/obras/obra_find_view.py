from urllib.parse import unquote
from src.controllers.interfaces.obra_controller_interface import ObraControllerInterface
from src.types.obra_response import ObraResponse
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ObraFindView(ViewInterface):
    def __init__(self, controller: ObraControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        identifier = http_request.params.get("identifier")

        obra: ObraResponse = None

        try:
            id = int(identifier)
            obra = self.__controller.find_by_id(id)
        except Exception:
            parsed_identifier = unquote(identifier)
            obra = self.__controller.find_by_cod(parsed_identifier)

        body_response = obra.to_dict()
        return HttpResponse(status_code=200, body=body_response)

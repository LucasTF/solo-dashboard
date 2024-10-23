from src.controllers.interfaces.obra_controller_interface import ObraControllerInterface
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ObraCreateView(ViewInterface):
    def __init__(self, controller: ObraControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        obra_info = http_request.body
        inserted_id = self.__controller.create(obra_info)

        body_response = self.__controller.find_by_id(inserted_id)

        return HttpResponse(status_code=201, body=body_response.to_dict())

from src.controllers.interfaces.cliente_controller_interface import ClienteControllerInterface
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.validators.valid_cliente import ValidCliente
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ClienteFindByIdView(ViewInterface):

    def __init__(self, controller: ClienteControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        identifier = http_request.params.get("identifier")

        try:
            id = int(identifier)
            cliente = self.__controller.find_by_id(id)
            body_response = ValidCliente.serialize(cliente).model_dump()
            
            return HttpResponse(
                status_code=200,
                body=body_response
            )
        except ValueError:
            raise UnavailableResourceError("Cliente")
        

        


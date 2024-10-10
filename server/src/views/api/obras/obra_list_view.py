from typing import List
from src.controllers.interfaces.obra_controller_interface import ObraControllerInterface
from src.services.pagination_service import PaginationService
from src.types.obra_response import ObraResponse
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class ObraListView(ViewInterface):
    def __init__(self, controller: ObraControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        page = http_request.params.get("page")
        entries_per_page = http_request.params.get("entries_per_page")
        search = http_request.params.get("search")

        obras = []

        if search is None:
            obras = self.__controller.list()
        else:
            obras = self.__controller.search(search)

        pag_service = PaginationService(obras)
        paginated_obras = pag_service.paginate(page, entries_per_page)

        data: List[ObraResponse] = []

        for obra in paginated_obras:
            data.append(obra.to_dict())

        return HttpResponse(
            status_code=200, body=pag_service.create_paginated_response(data)
        )

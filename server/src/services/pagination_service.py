import math
from typing import Dict, Generic, List, TypeVar

from src.errors.invalid_param_error import InvalidParamError

T = TypeVar("T")


class PaginationService(Generic[T]):
    def __init__(self, data: List[T]) -> None:
        self.__data = data
        self.__total_items = len(data)

    def paginate(self, page: int, items_per_page: int) -> List[T]:
        if page < 1 or items_per_page < 1:
            raise InvalidParamError

        total_pages = math.ceil(self.__total_items / items_per_page)

        window_start = (page - 1) * items_per_page
        window_end = 0

        if page < total_pages:
            window_end = page * items_per_page
        elif page == total_pages:
            window_end = self.__total_items
        else:
            return []

        return self.__data[window_start:window_end]

    def create_paginated_response(self, paginated_data: List[T]) -> Dict:
        total_pages = math.ceil(self.__total_items / len(paginated_data))

        paginated_response = {
            "total_entries": self.__total_items,
            "total_pages": total_pages,
            "data": paginated_data,
        }

        return paginated_response

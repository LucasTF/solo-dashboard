import math
from typing import List, TypeVar

T = TypeVar("T")

def paginate(data: List[T], page: int, items_per_page: int) -> List[T]:

    if (page < 1 or items_per_page < 1):
        raise Exception("Página e Itens por página devem ser maiores do que 0.")

    total_items = len(data)
    total_pages = math.ceil(total_items / items_per_page)

    window_start = (page-1) * items_per_page
    window_end = 0

    if (page < total_pages): 
        window_end = page * items_per_page
    elif (page == total_pages):
        window_end = total_items
    else:
        return []

    return data[window_start:window_end]
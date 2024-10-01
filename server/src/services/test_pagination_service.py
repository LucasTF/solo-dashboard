import unittest
import pytest

from src.errors.invalid_param_error import InvalidParamError
from src.services.pagination_service import PaginationService

class PaginateTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.sample_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        self.__service = PaginationService(self.sample_list)

    def test_paginate_start(self):
        paginated_list = self.__service.paginate(1, 2)

        self.assertListEqual(paginated_list, self.sample_list[0:2])

    def test_paginate_middle(self):
        paginated_list = self.__service.paginate(3, 3)

        self.assertListEqual(paginated_list, self.sample_list[6:9])

    def test_paginate_end(self):
        paginated_list = self.__service.paginate(3, 4)

        self.assertListEqual(paginated_list, self.sample_list[8:10])

    def test_paginate_with_more_pages_than_total_pages(self):
        paginated_list = self.__service.paginate(5, 4)

        self.assertListEqual(paginated_list, [])

    def test_paginate_with_empty_list(self):
        empty_data = PaginationService([])
        paginated_list = empty_data.paginate(1, 2)

        self.assertListEqual(paginated_list, [])

    def test_paginate_invalid_page(self):
        with pytest.raises(InvalidParamError):
            self.__service.paginate(0, 5)

    def test_paginate_invalid_items_per_page(self):
        with pytest.raises(InvalidParamError):
            self.__service.paginate(1, 0)

    
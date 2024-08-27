import unittest
import pytest

from src.utils.pagination import paginate


class PaginateTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.sample_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    def test_paginate_start(self):
        paginated_list = paginate(self.sample_list, 1, 2)

        self.assertListEqual(paginated_list, self.sample_list[0:2])

    def test_paginate_middle(self):
        paginated_list = paginate(self.sample_list, 3, 3)

        self.assertListEqual(paginated_list, self.sample_list[6:9])

    def test_paginate_end(self):
        paginated_list = paginate(self.sample_list, 3, 4)

        self.assertListEqual(paginated_list, self.sample_list[8:10])

    def test_paginate_with_more_pages_than_total_pages(self):
        paginated_list = paginate(self.sample_list, 5, 4)

        self.assertListEqual(paginated_list, [])

    def test_paginate_with_empty_list(self):
        paginated_list = paginate([], 1, 2)

        self.assertListEqual(paginated_list, [])

    def test_paginate_invalid_page(self):
        with pytest.raises(Exception):
            paginate(self.sample_list, 0, 5)

    def test_paginate_invalide_items_per_page(self):
        with pytest.raises(Exception):
            paginate(self.sample_list, 1, 0)

    
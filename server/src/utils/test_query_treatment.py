import unittest

from src.utils.query_treatment import get_integer_query_param, get_positive_query_param


class QueryTreatmentTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.sample_param = "2"
        self.sample_incorrect_param = "text"
        self.sample_zero_param = "0"

    def test_get_integer_query_param(self):
        param = get_integer_query_param(self.sample_param, 1)

        self.assertEqual(param, int(self.sample_param))

    def test_str_get_integer_query_param(self):
        default = 1

        param = get_integer_query_param(self.sample_incorrect_param, default)

        self.assertEqual(param, default)

    def test_zero_get_integer_query_param(self):
        param = get_integer_query_param(self.sample_zero_param, 1)

        self.assertEqual(param, 0)
        
    def test_zero_get_positive_query_param(self):
        default = 1

        param = get_positive_query_param(self.sample_zero_param, default)

        self.assertEqual(param, default)
from unittest import TestCase

from src.validators.validator_functions import contains_at_least_one_letter_and_whitespace, is_valid_cep


class ValidatorFunctionsTestCase(TestCase):

    def test_contains_at_least_one_letter_and_whitespace(self):
        sample = "Válid String"

        self.assertTrue(contains_at_least_one_letter_and_whitespace(sample))

    def test_contains_at_least_one_letter_and_whitespace_with_invalid_strings(self):
        samples = ["   ", "String with 2 numbers 34", "Sym-bols", "4545"]

        for element in samples:
            self.assertFalse(contains_at_least_one_letter_and_whitespace(element))

    def test_is_valid_cep(self):
        sample = "02154-555"

        self.assertTrue(is_valid_cep(sample))

    def test_is_valid_cep_with_invalid_strings(self):
        samples = ["xs542-334", "03222589", "02-32-002", "00584_448"]

        for element in samples:
            self.assertFalse(is_valid_cep(element))
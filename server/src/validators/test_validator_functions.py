from unittest import TestCase

import pytest

from src.validators.validator_functions import validate_at_least_one_letter_and_whitespace, validate_cep, validate_cpf, validate_uf


class ValidatorFunctionsTestCase(TestCase):

    def test_validate_at_least_one_letter_and_whitespace(self):
        sample = "Válid String"

        self.assertEqual(validate_at_least_one_letter_and_whitespace(sample), sample)

    def test_validate_at_least_one_letter_and_whitespace_with_invalid_strings(self):
        samples = ["   ", "String with 2 numbers 34", "Sym-bols", "4545"]

        for element in samples:
            with pytest.raises(ValueError):
                validate_at_least_one_letter_and_whitespace(element)

    def test_validate_cep(self):
        sample = "02154-555"

        self.assertEqual(validate_cep(sample), sample)

    def test_validate_cep_with_invalid_strings(self):
        samples = ["xs542-334", "03222589", "02-32-002", "00584_448"]

        for element in samples:
            with pytest.raises(ValueError):
                self.assertEqual(validate_cep(element), element)

    def test_validate_cpf(self):
        sample = "002.584.659-12"

        self.assertEqual(validate_cpf(sample), sample)

    def test_validate_cpf_with_invalid_strings(self):
        samples = ["000.000.x00-52", "121-355-484-12", "325-489-645.22", "---.---.------"]

        for element in samples:
            with pytest.raises(ValueError):
                self.assertEqual(validate_cpf(element), element)

    def test_validate_uf(self):
        sample = "SP"

        self.assertEqual(validate_uf(sample), sample)

    def test_validate_uf_with_invalid_strings(self):
        samples = ["SSP", "HX", "65", "W2"]

        for element in samples:
            with pytest.raises(ValueError):
                self.assertEqual(validate_uf(element), element)

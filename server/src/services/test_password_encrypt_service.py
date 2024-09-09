import unittest

from src.services.password_encrypt_service import PasswordEncryptService


class PasswordEncryptServiceTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.password_service = PasswordEncryptService()

    def test_password_hashing(self):
        sample_password = "123456"

        hashed_password = self.password_service.hash_password(sample_password)

        self.assertIsInstance(hashed_password, bytes)
        self.assertNotEqual(sample_password, hashed_password)

    def test_check_password(self):
        sample_password1 = "123456"
        sample_password2 = "abcdef"

        hashed_password1 = self.password_service.hash_password(sample_password1)
        hashed_password2 = self.password_service.hash_password(sample_password2)

        check1 = self.password_service.check_password(sample_password1, hashed_password1)
        self.assertTrue(check1)

        check2 = self.password_service.check_password(sample_password2, hashed_password2)
        self.assertTrue(check2)

        check3 = self.password_service.check_password(sample_password1, hashed_password2)
        self.assertFalse(check3)
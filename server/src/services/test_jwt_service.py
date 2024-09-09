import unittest

from src.services.jwt_service import JwtService


class JwtServiceTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.jwt_service = JwtService()
        self.jwt_body = {
            "name": "Test",
            "email": "email@email.com",
        }

    def test_jwt_token(self):
        token = self.jwt_service.create_jwt_token(self.jwt_body)

        self.assertIsNotNone(token)
        self.assertIsInstance(token, str)
        
        decoded_token = self.jwt_service.decode_jwt_token(token)

        self.assertEqual(decoded_token['name'], self.jwt_body['name'])
        self.assertEqual(decoded_token['email'], self.jwt_body['email'])

    
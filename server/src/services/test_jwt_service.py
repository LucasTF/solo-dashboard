from datetime import datetime, timedelta, timezone
import unittest
from unittest.mock import Mock

from jwt import DecodeError, ExpiredSignatureError
import jwt
import pytest

from src.services.jwt_service import JwtService
from src.config.environment import jwt_env


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

    def test_wrong_format_jwt_token(self):
        with pytest.raises(DecodeError):
            self.jwt_service.decode_jwt_token("272yg27g72dg272g2hhbidn9xnmj")

    def test_expired_jwt_token(self):
        self.jwt_service.create_jwt_token = Mock()
        self.jwt_service.create_jwt_token.return_value = jwt.encode(payload={
            "exp": datetime.now(timezone.utc) + timedelta(days=-2)
        },
        key=jwt_env["JWT_SECRET"],
        algorithm=jwt_env["JWT_ALGORITHM"])

        token = self.jwt_service.create_jwt_token()

        self.assertIsNotNone(token)
        self.assertIsInstance(token, str)

        with pytest.raises(ExpiredSignatureError):
            self.jwt_service.decode_jwt_token(token)
    

    
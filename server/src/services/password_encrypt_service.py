import bcrypt


class PasswordEncryptService:

    def hash_password(self, password: str) -> bytes:
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        return hashed_password
    
    def check_password(self, password: str, hashed_password: str | bytes) -> bool:
        if isinstance(hashed_password, str):
            return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))
        
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password)
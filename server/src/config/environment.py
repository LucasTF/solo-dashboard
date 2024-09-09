import os


db_env = {
    "DATABASE_CONN_STRING": os.getenv("DATABASE_CONN_STRING")
}

jwt_env = {
    "JWT_SECRET": os.getenv("JWT_SECRET"),
    "JWT_ALGORITHM": os.getenv("JWT_ALGORITHM"),
    "JWT_HOURS": os.getenv("JWT_HOURS")
}
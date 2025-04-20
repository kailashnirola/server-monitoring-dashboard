from sqlalchemy import Column, Integer, String
from app.db import Base

class Server(Base):
    __tablename__ = "servers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    ip = Column(String, unique=True, index=True)

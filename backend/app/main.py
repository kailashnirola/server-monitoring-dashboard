from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import metrics, servers
from app.db import Base, engine
import app.models

from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()
engine = create_engine(os.getenv("DATABASE_URL"))
conn = engine.connect()
print("Manual connection from main.py: SUCCESS")


app = FastAPI(title="Server Monitoring API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
app.include_router(servers.router, prefix="/servers", tags=["Servers"])

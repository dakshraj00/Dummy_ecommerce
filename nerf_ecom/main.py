from fastapi import FastAPI
from Database import database
from Database import models
from routers import orders 
from detectors.detecetor_router import drouter
from routers import ai_router
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



models.Base.metadata.create_all(bind=database.engine)

app.include_router(orders.router)
app.include_router(drouter)
app.include_router(ai_router.chat_router)
@app.get("/")
def bro():
    return "server is running"
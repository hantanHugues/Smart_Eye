
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection (à remplacer avec vos informations)
MONGO_URI = os.getenv("MONGO_URI", "votre_uri_mongodb")
client = MongoClient(MONGO_URI)
db = client.guardian_ai  # nom de votre base de données
incidents_collection = db.incidents  # nom de votre collection

@app.post("/incidents")
async def create_incident(incident: dict):
    try:
        result = incidents_collection.insert_one(incident)
        return {"id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/incidents")
async def get_incidents():
    try:
        incidents = list(incidents_collection.find({}, {'_id': 0}))
        return incidents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
from pydantic import BaseModel
from typing import Optional
import base64

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URI = "mongodb+srv://ashlanvonnewgat:P3awqacwWZbCyPHx@cluster0.lxa4x2g.mongodb.net/Smarteye?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client.Smarteye
incidents_collection = db.incidents

class Incident(BaseModel):
    timestamp: str
    incident_type: str
    location: str
    image_name: str
    image_data: str
    message: str

@app.post("/incidents")
async def create_incident(incident: Incident):
    try:
        incident_dict = incident.dict()
        result = incidents_collection.insert_one(incident_dict)
        return {"id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/incidents")
async def get_incidents():
    try:
        incidents = list(incidents_collection.find({}))
        # Convert ObjectId to string for JSON serialization
        for incident in incidents:
            incident['_id'] = str(incident['_id'])
        return incidents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/incidents/{incident_id}")
async def get_incident(incident_id: str):
    try:
        from bson import ObjectId
        incident = incidents_collection.find_one({"_id": ObjectId(incident_id)})
        if incident:
            incident['_id'] = str(incident['_id'])
            return incident
        raise HTTPException(status_code=404, detail="Incident not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)

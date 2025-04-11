
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
from typing import Optional
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

# MongoDB connection
client = MongoClient(os.getenv("MONGODB_URI"))
db = client.guardian_ai
incidents_collection = db.incidents

@app.post("/incidents")
async def create_incident(incident: dict):
    incident["timestamp"] = datetime.fromisoformat(incident["timestamp"])
    result = incidents_collection.insert_one(incident)
    return {"id": str(result.inserted_id)}

@app.get("/incidents")
async def get_incidents():
    incidents = list(incidents_collection.find({}, {'_id': 0}))
    for incident in incidents:
        incident["timestamp"] = incident["timestamp"].isoformat()
    return incidents

@app.get("/incidents/stats")
async def get_incident_stats():
    total = incidents_collection.count_documents({})
    by_type = list(incidents_collection.aggregate([
        {"$group": {"_id": "$incident_type", "count": {"$sum": 1}}}
    ]))
    return {
        "total": total,
        "by_type": {item["_id"]: item["count"] for item in by_type}
    }

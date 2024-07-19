from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# In-memory storage for the last URL
last_url = None

class URLItem(BaseModel):
    url: str
    timestamp: str

class URLList(BaseModel):
    data: List[URLItem]

class SearchQuery(BaseModel):
    query: str

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs, for now allowing all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pos")
def store_url(url_list: URLList):
    global last_url
    if url_list.data:
        last_url = url_list.data[-1]  # Store only the last URL
        logging.debug(f"Stored URL: {last_url}")  # Log the stored URL
    return {"message": "URL stored successfully", "stored_url": last_url}

@app.get("/urls", response_model=URLItem)
def get_last_url():
    return last_url

@app.post("/search", response_model=List[URLItem])
def search_urls(search_query: SearchQuery):
    if last_url and search_query.query.lower() in last_url.url.lower():
        return [last_url]
    return []
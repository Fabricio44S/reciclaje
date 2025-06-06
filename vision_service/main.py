from fastapi import FastAPI
from pydantic import BaseModel
from random import choice

app = FastAPI()

class ImageRequest(BaseModel):
    image_url: str

LABELS = ['plastico', 'vidrio', 'metal', 'papel']

@app.post('/classify')
def classify(req: ImageRequest):
    # Aqui se integraria el modelo de IA real
    label = choice(LABELS)
    return {'label': label}

from pydantic import BaseModel

class Book(BaseModel):
    isbn: str
    genre: str
    title: str
    author: str
    status: bool
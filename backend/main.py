from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Book

app = FastAPI()

from database import (
    fetch_one_book,
    fetch_all_books,
    create_book,
    update_book,
    remove_book
)

origins = ['http://localhost:3000', 'https://localhost:3000', 'http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    # * = everything
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"Ping" : "Pong"}

@app.get("/api/library")
async def get_library():
    response = await fetch_all_books()
    return response

@app.get("/api/library/{isbn}", response_model=Book)
async def get_book_by_isbn(isbn : int):
    response = await fetch_one_book(isbn)
    if response:
        return response
    else:
        raise HTTPException(404, f"There is no book with the ISBN {isbn}")

@app.post("/api/library", response_model=Book)
async def post_book(book:Book):
    response = await create_book(book.dict()) # convert JSON to dictionary
    if response:
        return response
    else:
        raise HTTPException(400, f"Something went wrong / Bad request") 

@app.put("/api/library/{isbn}", response_model=Book)
async def put_book(isbn: int, status: bool):
    response = await update_book(isbn, status)
    if response:
        return response
    else:
        raise HTTPException(404, f"There is no book with the isbn {isbn}")

@app.delete("/api/library/{isbn}")
async def delete_book(isbn : str):
    response = await remove_book(isbn)
    if response:
        return f"Successfully deleted book with isbn: {isbn}"
    else:
        raise HTTPException(404, f"There is no book with the isbn {isbn}")
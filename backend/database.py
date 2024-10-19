from model import Book
# MongoDB driver
import motor.motor_asyncio

# connection between database.py and MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017') # default port for MongoDB
database = client.Library
collection = database.library

async def fetch_one_book(isbn):
    document = await collection.find_one({'isbn':isbn})
    return document

async def fetch_all_books():
    books = []
    cursor = collection.find({})
    async for document in cursor:
        books.append(Book(**document)) # ** unpack document into book
    return books

async def fetch_all_books_with_title(title):
    books = []
    cursor = collection.find({title})
    async for document in cursor:
        books.append(Book(**document)) # ** unpack document into book
    return books

async def create_book(book):
    document = book
    result = await collection.insert_one(document)
    return document

async def update_book(isbn, status):
    await collection.update_one(
        {"isbn": isbn},
        {"$set": {
            "status": status
        }}
    )
    document = await collection.find_one({"isbn":isbn})
    return document

async def remove_book(isbn):
    await collection.delete_one({"isbn":isbn})
    return True
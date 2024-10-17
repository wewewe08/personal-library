from model import Todo
# MongoDB driver
import motor.motor_asyncio

# connection between database.py and MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017') # default port for MongoDB
database = client.TodoList
collection = database.todo

async def fetch_one_todo(title):
    document = await collection.find_one({'title':title})
    return document

async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document)) # ** unpack document into Todo
    return todos

async def create_todo(todo):
    document = todo
    result = await collection.insert_one(document)
    return document

async def update_todo(title, description):
    await collection.update_one({"title":title}, {"$set":{
        "description":description}})
    document = await collection.find_one({"title":title})
    return document

async def remove_todo(title):
    await collection.delete_one({"title":title})
    return True
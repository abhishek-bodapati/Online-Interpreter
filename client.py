import asyncio
from websockets import connect
import cgi

async def hello(uri):
    form = cgi.FieldStorage()
    print(form.getvalue('textcontent') + "hi")
    async with connect(uri) as websocket:
        await websocket.send("Hello world!")
        rec_mg = await websocket.recv()
        print(rec_mg)

asyncio.run(hello("ws://localhost:8765"))
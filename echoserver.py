import asyncio
import os
from websockets import serve
import subprocess

async def echo(websocket, path):
    async for message in websocket:

        # Create .py file
        filePath = 'x.py'
        f = open(filePath, "w")
        f.write(message)
        print(".py file created")
        # print(message)

        # Run python file
        cmd = subprocess.run(["python", "x.py"], capture_output=True)
        stdout = cmd.stdout.decode()  # bytes => str
        print(stdout)

        await websocket.send(message)

async def main():
    async with serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())
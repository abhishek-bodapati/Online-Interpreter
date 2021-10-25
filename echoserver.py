import asyncio
from websockets import serve
import subprocess
import os
import json

async def echo(websocket, path):
    async for message in websocket:

        code = json.loads(message)["message"]
        inputs = json.loads(message)["inputs"]
        print(code)
        # Create .py file
        filePath = 'x.py'
        try:
            outFile = open(filePath, 'w')
            outFile.write(code)
            outFile.close()
        except IOError as e:
            errno, strerror = e.args
            print("I/O error({0}): {1}".format(errno, strerror))

        # Run python file
        p = subprocess.Popen("python x.py", shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        p.stdin.write(inputs)
        output, errors = p.communicate()
        if p.returncode:
            print(errors)
            await websocket.send(errors)
        else:
            print(output)
            await websocket.send(output)

        # Delete the .py file
        os.remove("x.py")

async def main():
    async with serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())
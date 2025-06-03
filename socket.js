const net = require('net');
const crypto = require("crypto");
const fs = require('fs');
const MAGIC_STRING = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

function encodeWebSocketFrame(data) {
  const payload = Buffer.from(data);
  const frame = [0x81]; // FIN + text frame (opcode 0x1)

  if (payload.length < 126) {
    frame.push(payload.length);
  } else {
    throw new Error('This example only supports payloads < 126 bytes.');
  }

  return Buffer.concat([Buffer.from(frame), payload]);
}


function convertoBinary(buffer){
  const binary = [];
  const len = buffer.length;
  console.log(buffer);


  for(let i = 0 ; i < len ; i++ ){
    for(let j=7 ; j > -1 ; j--){
      const b = (buffer[i] & (2**j)) >> j;
      binary.push(b);
    }
    binary.push('');
  }
  return binary.join('');

}

const sockets = [];

const server = net.createServer((socket)=>{
    
    socket.once('data' , (buffer)=>{
        const req = buffer.toString();
        fs.writeFileSync('./buffer.txt' , buffer.toString() );
        const key = req.match(/Sec-WebSocket-Key: (.+)/i)[1];
        const secAccpetKey = crypto.createHash("sha1").update(key + MAGIC_STRING ).digest('base64');

        const headers = [
            'HTTP/1.1 101 Switching Protocols',
            'Upgrade: websocket',
            'Connection: Upgrade',
            `Sec-WebSocket-Accept: ${secAccpetKey}`,
            '\r\n'
        ];

        socket.write(headers.join("\r\n"));

        sockets.push(socket);
        console.log(sockets.length);
        sockets.forEach(soc=>{
          soc.write(encodeWebSocketFrame("new device connected"));
        })


        socket.on("data" , (buffer)=>{
            const binary = convertoBinary(buffer);
            const fin = binary[1];
            const opcode = binary.slice(4 , 8);
            const mask = binary[8];
            const payloadLen = binary.slice(9 , 16);
            const maskKey = binary.slice(16 , 48);
            const payload = binary.slice(48 , -1);
            
            const decodeArray = new Uint8Array(buffer[1] - 128 );


            for(let i = 0 ; i < buffer[1] - 128  ; i++){
              decodeArray[i] = buffer[6 + i] ^ buffer[2 + i % 4]
            }

            const text = new TextDecoder().decode(decodeArray);
            
            console.log({fin});
            console.log({opcode});
            console.log({mask});
            console.log({payloadLen});
            console.log({maskKey});
            console.log({payload});
            console.log({decodeArray})
            console.log({text})


            sockets.forEach(soc=>{
              soc.write(encodeWebSocketFrame(text));
            })
        })
    })
})


server.listen( 8080 ,"0.0.0.0", () => {
  console.log('opened server on', server.address());
});
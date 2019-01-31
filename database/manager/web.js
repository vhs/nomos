const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();

const { spawn } = require('child_process');

app.use(express.static("web"));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server: server });

wss.on("connection", ws => {
  ws.on("message", message => {
    const obj = JSON.parse(message);
    console.log(message);
      
    if (obj.type === "connect") {
      if (ws.mysql) {
        ws.mysql.kill('SIGHUP');
      }
      
      ws.mysql = spawn('script', ['-c', '"mysql -h 172.18.0.1 -u nomos -pnomos"'], { shell: true });
      
      ws.mysql.stdout.on('data', data => {
        console.log(data.toString('utf8'));
        ws.send(JSON.stringify({
          type: 'stdout',
          data: data.toString('utf8')
        }));
      });
      
      ws.mysql.stderr.on('data', data => {
        console.log(data.toString('utf8'));
        ws.send(JSON.stringify({
          type: 'stderr',
          data: data.toString('utf8')
        }));
      });
      
      ws.mysql.on('close', () => {
        ws.send(JSON.stringify({
          type: 'close',
          data: 'program exit'
        }));
        ws.mysql = null;
      });
        
      return;
    }
      
    if (obj.type === "command") {
      console.log(obj.data);
      if (ws.mysql) {
        ws.mysql.stdin.write(obj.data);
      }
      
      return;
    }
      
    ws.send(JSON.stringify({
      type: 'stderr',
      data: data.toString('utf8')
    }));
  });
  
  ws.on("close", () => {
    if (ws.mysql) {
      ws.mysql.kill('SIGHUP');
    }
  });
});

server.listen(3000);

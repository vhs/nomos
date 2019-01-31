const config = require("./config");
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
      
      const host = obj.data.trim();
      
      ws.mysql = spawn('script', ['-c', `"mysql -h ${host} -u root -p${config.db.root_password}"`], { shell: true });
      
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

module.exports = {
  server: server,
  app: app,
  wss: wss
};

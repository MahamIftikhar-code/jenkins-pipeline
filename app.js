const express = require('express');
const os = require('os');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Jenkins Pipeline</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 40px;
          max-width: 550px;
          width: 90%;
          text-align: center;
        }
        h1 { color: #f0a500; font-size: 1.8rem; margin-bottom: 10px; }
        .badge {
          display: inline-block;
          background: #f0a500;
          color: #1a1a2e;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.85rem;
          margin: 15px 0;
        }
        .info { margin-top: 20px; }
        .info p {
          color: rgba(255,255,255,0.6);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.9rem;
        }
        .green { color: #00ff88; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Jenkins CI/CD Pipeline</h1>
        <div class="badge">Deployed via Jenkins</div>
        <div class="info">
          <p>Code pulled from GitHub</p>
          <p>Tests passed</p>
          <p>Docker image built and pushed</p>
          <p>Deployed to AWS EC2</p>
          <p class="green">Live: ${new Date().toLocaleString()}</p>
          <p>Host: ${os.hostname()}</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    deployedBy: 'Jenkins',
    time: new Date().toISOString()
  });
});

module.exports = app;
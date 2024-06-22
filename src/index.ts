import express from 'express';
import {Signale} from "signale";


const app = express();
const PORT = 3000;
let server = null;
const signale = new Signale();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo desde TypeScript');
});

async function startServer() {
  server = app.listen(PORT, () => {
      signale.success(`Servidor corriendo en http://localhost:${PORT}`);
  });
  
}

startServer();
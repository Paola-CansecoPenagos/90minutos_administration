/*import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo desde TypeScript');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
*/
import express from 'express';
import { ReportRoutes } from './infrastructure/web/routes/reportRouters';
import { MessagingService } from './infrastructure/messaging/messagingService';
import connectDatabase from './config/db';

const app = express();
app.use(express.json());

const reportRoutes = new ReportRoutes();
app.use('/api/reports', reportRoutes.router);

const messagingService = new MessagingService('amqp://localhost');
messagingService.setup().then(() => console.log('Messaging service started'));

connectDatabase().then(() => {
  app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
  });
});

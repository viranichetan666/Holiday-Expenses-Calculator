import express from 'express';
import cors from 'cors';
import appRoutes from './routes'
import { ErrorHandler } from './middleware/error';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors())

app.use(express.json())

app.use('/api/', appRoutes)

app.use(ErrorHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

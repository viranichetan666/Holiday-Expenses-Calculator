import express from 'express';
import appRoutes from './routes'

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = express();

app.use(express.json())

app.use('/api/', appRoutes)
  
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

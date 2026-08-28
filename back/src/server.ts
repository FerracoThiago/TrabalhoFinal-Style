import express from 'express';
import cors from 'cors';
import configDotenv from './config/dotenv';
import routes from './routes/routes';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`StyleMP app listening at http://localhost:${port}`);
});


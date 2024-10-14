import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: () => true }));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

let isEven = true;
let nextId = 1;

const skills = [
  { id: nextId++, name: 'React' },
  { id: nextId++, name: 'Redux' },
  { id: nextId++, name: 'Redux Thunk' },
  { id: nextId++, name: 'RxJS' },
  { id: nextId++, name: 'Redux Observable' },
  { id: nextId++, name: 'Redux Saga' },
];

app.get('/api/search', async (req, res) => {
  if (Math.random() > 0.75) {
    return res.status(500).end();
  }

  const { q } = req.query;

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = skills.filter((o) => o.name.toLowerCase().startsWith(q.toLowerCase()));

      res.send(JSON.stringify(data));
      resolve();
    }, isEven ? 1000 : 5 * 1000);

    isEven = !isEven;
  });
});

const port = process.env.PORT || 7070;

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`)
});

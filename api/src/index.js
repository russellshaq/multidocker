const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const keys = require('./config/keys');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  user: keys.pgUser,
  password: keys.pgPassword,
  database: keys.pgDatabase
})

pool.on('error', (e) => console.error(e));

pool.query('CREATE TABLE IF NOT EXISTS values(number INT)');

app.get('/values', async (req, res) => {
  try {
    const client = await pool.connect();
    const values = await client.query('SELECT * FROM values');
    client.release();
    res.send({ numbers: values.rows })
  } catch (e) {
    res.status(500).end();
  }
})

app.post('/values', async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO values(number) values($1)', [req.body.number]);
    client.release();
    res.status(201).send({ number: req.body.number });
  } catch (e) {
    res.status(500).end();
  }
})

app.listen(5000);


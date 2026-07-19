require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const MenuItem = require('./models/MenuItem');
const Bill = require('./models/Bill');
const Settings = require('./models/Settings');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env — copy .env.example to .env and fill it in.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ---------- Menu routes ----------
app.get('/api/menu', async (req, res) => {
  const items = await MenuItem.find().sort({ category: 1, name: 1 });
  res.json(items);
});

app.post('/api/menu', async (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price === undefined) return res.status(400).json({ error: 'name and price are required' });
  const item = await MenuItem.create({ name, price, category: category || 'Uncategorized' });
  res.status(201).json(item);
});

app.delete('/api/menu/:id', async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ---------- Bill routes ----------
app.get('/api/bills', async (req, res) => {
  const bills = await Bill.find().sort({ createdAt: -1 }).limit(500);
  res.json(bills);
});

app.post('/api/bills', async (req, res) => {
  const { customer, items, subtotal, taxPct, taxAmt, total } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: 'items are required' });
  const bill = await Bill.create({ customer, items, subtotal, taxPct, taxAmt, total });
  res.status(201).json(bill);
});

app.delete('/api/bills/:id', async (req, res) => {
  await Bill.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ---------- Settings routes ----------
app.get('/api/settings/:key', async (req, res) => {
  const s = await Settings.findOne({ key: req.params.key });
  res.json({ value: s ? s.value : null });
});

app.put('/api/settings/:key', async (req, res) => {
  const { value } = req.body;
  await Settings.findOneAndUpdate(
    { key: req.params.key },
    { key: req.params.key, value },
    { upsert: true }
  );
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Cafe billing app running at http://localhost:${PORT}`));

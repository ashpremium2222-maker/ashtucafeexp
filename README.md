# Cafe Billing App

A simple menu & billing app for your cafe, backed by your own MongoDB database.
Menu items and every printed bill are saved permanently and safely — the database
password lives only on your computer/server, never in the browser.

## First: rotate your MongoDB password

The password you shared earlier is no longer private. Before using this app:
1. Go to MongoDB Atlas → **Database Access**
2. Edit your database user → **Edit Password** → generate a new one
3. Use the NEW password in the steps below (never the old one)

## Setup (one-time)

1. Install [Node.js](https://nodejs.org) if you don't have it (any recent version).
2. Open a terminal in this folder and run:
   ```
   npm install
   ```
3. Copy `.env.example` to a new file named `.env`:
   ```
   cp .env.example .env
   ```
4. Open `.env` in a text editor and paste in your real MongoDB connection string
   (from Atlas → Connect → Drivers). It looks like:
   ```
   MONGODB_URI=mongodb+srv://ashtupremium_db_user:YOUR_NEW_PASSWORD@yourcluster.mongodb.net/cafeDb?retryWrites=true&w=majority
   ```
5. **Never share the `.env` file or commit it to GitHub.** It contains your database password.

## Running it

```
npm start
```

Then open **http://localhost:3000** in your browser. That's it — the same menu,
billing, and print screen you saw before, now saving everything straight to your
own database.

## What's saved

- Every menu item you add (name, price, category)
- Every bill you print (items, customer/table, totals, timestamp)
- Your cafe name

All of it lives in your MongoDB database — open anytime, from any device, as long
as this server is running and reachable.

## Adding features later

This is a normal small Node.js + Express + MongoDB app — nothing exotic. New
features (staff logins, daily sales totals, editing menu items, exporting bills
to Excel, running it on multiple devices) are all straightforward additions from
here. Just describe what you want next.

## Putting it online (so it works outside your own computer)

Right now this only works on the computer it's running on. To make it reachable
from anywhere (e.g. a tablet at the counter), host it on a free/cheap service like
Render or Railway, and set the same `MONGODB_URI` as an environment variable
there (never inside the code). Ask if you'd like help with that step when you're
ready.

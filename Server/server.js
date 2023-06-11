const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Statische Dateien aus dem "build" -Ordner servieren
app.use(express.static(path.join(__dirname, '../build')));

// Alle Anfragen, die nicht mit statischen Dateien übereinstimmen, an index.html weiterleiten
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

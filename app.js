const express = require('express');

const app = express();

//Index Route
app.get('/', (req, res) => {
  res.send('INDEX');
});

//About Route
app.get('/about', (req, res) => {
  res.send('Changes are detected');
});

const port = 5000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown on SIGINT signal
process.on('SIGINT', () => {
  console.log('Server shutting down.');
  process.exit();
});
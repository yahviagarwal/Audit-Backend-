const express = require('express');
const bodyParser = require('body-parser');

const auditRoutes = require('./routes/audit-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/audit', auditRoutes); // Routes for audit-related APIs

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});




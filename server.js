require('dotenv').config()

const app = require('./app');
const port = process.env.PORT || 3000;
const db = require('./src/infra/sqlite3-db.js');
const routes = require('./src/routes');
routes(app);

const server = app.listen(port, () => console.log(`App listening on port ${port}`));




module.exports = server;
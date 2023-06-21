const express = require('express');
const routes = require('./routes');
// sequelize connection (IMPORT)
const sequelize = require('./config/connection');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// (SYNC) sequelize models to the database 
// (TURN ON) server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
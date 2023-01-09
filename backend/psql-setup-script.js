const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});

// checks if schema name you have defined as env var is already present ind b -- if not, sqlize executes the sql comm to create schema within db
// ie: 'CREATE SCHEMA IF NOT EXISTS <'schema-name'>'

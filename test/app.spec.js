'use strict';

const fs = require('fs');
const path = require('path');

const models = require('../app/models');
const db = require('../app/models').sequelize;

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

beforeEach(done => {
  truncateDatabase().then(() => done());
});

afterAll(done => {
  db.close().then(() => done());
});

// including all test files
const normalizedPath = path.join(__dirname, '.');

const requireAllTestFiles = pathToSearch => {
  fs.readdirSync(pathToSearch).forEach(file => {
    if (fs.lstatSync(`${pathToSearch}/${file}`).isDirectory()) {
      requireAllTestFiles(`${pathToSearch}/${file}`);
    } else {
      require(`${pathToSearch}/${file}`);
    }
  });
};

requireAllTestFiles(normalizedPath);

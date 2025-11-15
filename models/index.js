// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;



'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, dirname, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import { fileURLToPath } from 'url';
import configObject from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';
const config = configObject[env];

const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Model import - ESM compatible
const files = readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    !file.endsWith('.test.js')
  );
});

for (const file of files) {
  const modulePath = join(__dirname, file);
  const modelModule = await import(`file://${modulePath}`);
  
  // যদি model default export হয়
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Associate methods
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

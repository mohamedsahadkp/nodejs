var Sequelize = require('sequelize');

const fs = require('fs');
const rdsCa = fs.readFileSync(__dirname + '/ssl/rds-combined-ca-bundle.pem');

const sequelize = new Sequelize("testdb1", "postgres", "postgres", {
    host: 'database-1.11111111111.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            //ca: [rdsCa]
        }
    }
});

// const sequelize = new Sequelize("maphabit_develop", "postgres", "IYCS4a05Fr2K5odrzDqd", {
//     host: 'database-1.11111111111.us-east-1.rds.amazonaws.com',
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: true,
//             ca: [rdsCa]
//         }
//     }
// });


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.error);
  });
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, { useNewUrlParser: true })
    .then(con => {
      // console.log(con.connections);
      console.log('DB connection successful!');
    });

// Read JSON file
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

// import data into DB
const importData = async () => {
  try {
    const result = await Tour.create(JSON.parse(tours));
    console.log('Database loaded successfully: ', result);
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Database deleted successfully!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);

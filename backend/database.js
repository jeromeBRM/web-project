const sqlite3 = require('sqlite3').verbose();
const dbname = './db/main.sqlite';

exports.db = new sqlite3.Database(dbname, (err) => {
    if(err){
      return console.error(err.message);
    }
  
    console.log('Connected to the main.sqlite database.');
});

/*db.close((err) =>{
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/
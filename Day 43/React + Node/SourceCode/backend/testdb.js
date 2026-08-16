const mysql = require("mysql2");

const db3306 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "productdb",
  port: 3306
});

db3306.connect((err) => {
  if (err) console.log("3306 Failed:", err.message);
  else {
      console.log("3306 Connected successfully!");
      db3306.end();
  }
});

const db3307 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "productdb",
  port: 3307
});

db3307.connect((err) => {
  if (err) console.log("3307 Failed:", err.message);
  else {
      console.log("3307 Connected successfully!");
      db3307.end();
  }
});

const mysql = require('mysql2/promise')
const express = require("express");
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "Cripta",
    password: ""
});


const sql = `SELECT * FROM cheloveki`;
const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;


app.get('/', function(req, res) {
  pool.query('SELECT * FROM cheloveki').then(function(data) {
    const abonents = data[0];
    console.log(abonents)
    res.send(`<!DOCTYPE html>
    <html>
      <body >
      <div style = " width: 300px; height: 400px; text-align: center; position:absolute; left:400px">
        <ul>
          ${abonents.map(abonent => `id: ${abonent.id}` + ` name:` + `         ` +  `${abonent.name}` + ` <br>` ).join('')}
        </ul>
      </div>
      <input type = "button" value = "add"  style="position: absolute; left: 600px;" onclick = 'add()'
		></input> 
      </body>
    </html>`);

function add(){
  
    const sql = `INSERT INTO cheloveki(id, name) VALUES(3, 'Sam')`;
    pool.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
}
  });
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


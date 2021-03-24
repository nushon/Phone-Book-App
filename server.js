const http = require("http");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./phonebook', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the phoneBook database.');
  });
var myTable = "CREATE TABLE contacts(name varchar(50), contact varchar(15))";
// var objData = "INSERT INTO contacts(id, name, contact)VALUES(?, ?, ?) [obj]";
// TODO 1
function createTable(){

    if(!myTable){
        db.run(myTable);
    }

    /**
     * Create a table called contacts with the following columns:
     *     a. id (the datatype should be int and also set as the primary key)
     *     b. name (the datatype should be varchar) and
     *     c. contact (the datatype should be varchar)
     */
}
createTable();

const server = http.createServer((req, res) => {
    let url = req.url;
    let method = req.method;

    if (url === "/" && method === "GET"){
        fs.readFile("./contacts.html", "utf8", (err, data) => {
            res.end(data);
        })
    } else if (url === "/contact/create" && method === "GET"){
        fs.readFile("./create-contact.html", "utf8", (err, data) => {
            res.end(data);
        })
    } else if (url === "/create" && method === "POST"){
        let body = "";
        req.on ('data', (data) => {
            body += data;
            
            // console.log(body);
        });
        req.on('end' , () => {
            // fs.readFile('./phonebook', 'utf8', function (error, data) {
                obj = JSON.parse(body)
                let name = obj.name;
                // console.log()
                let contact = obj.contact;
                db.run(`INSERT INTO contacts(name, contact)VALUES(?, ?)`, [name, contact], function(err){
                    if(err){
                        return console.log('ws', err);
                    }

                    console.log('row created');
                })

            // })
            
            
        })
      
        // TODO 2

        /**
         * Get the data from the front-end and store it in the contacts table
         */
    } else if (url === "/contacts" && method === "GET"){

        let mysqlqueries = `SELECT rowid, name, contact FROM contacts`;
        db.all(mysqlqueries, (err, row) => {
            if(err){
                throw err;
            }
            res.end(JSON.stringify({row}));
        })

    
        // TODO 3


        /**
         * Query the contacts table, get the data and send it to the user 
         */
    }  
    // else {
    //     res.end("404");
    // }
})

server.listen(2100, () => {
    console.log("Server is listening on port 3600");
})
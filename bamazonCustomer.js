var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
});

// Prints all item's id, name, and price from database's product table
function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\n-----------------------------------------");
        console.log("Item ID -- Product Name -- Price ($)\n");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "  --  " + res[i].product_name + "  --  " + res[i].price );
        }
        console.log("-----------------------------------------");
        connection.end();
    });
}
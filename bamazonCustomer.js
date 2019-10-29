var mysql = require("mysql");
var inquirer = require("inquirer");

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
            console.log(res[i].item_id + "  --  " + res[i].product_name + "  --  " + res[i].price);
        }
        console.log("-----------------------------------------");
        //connection.end();
        start();
    });
}

let inputID = null;
let inputAmt = null;

function start() {

    let itemPrice = null;
    let itemStock = null;

    inquirer
        .prompt({
            name: "id_num",
            type: "number",
            message: "Enter the Item ID number for the item you'd like to purchase."
        })
        .then(function (answer) {
            if (answer.id_num < 1 || answer.id_num > 10) {
                console.log("Please enter correct an ID number between 1 and 10");
                start();
            } else {
                console.log("inputed ID number: " + answer.id_num);
                inputID = answer.id_num;
                connection.query("SELECT price, stock_quantity FROM products WHERE item_id = ?",
                    [inputID],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res);
                        itemPrice = parseFloat(res[0].price);
                        itemStock = parseFloat(res[0].stock_quantity);
                        console.log("price: " + itemPrice);
                        console.log("stock: " + itemStock);
                        connection.end();
                        amountRequested(itemStock);
                    });
            }
        });
}

function amountRequested(stock) {
    inquirer
        .prompt({
            name: "amount",
            type: "number",
            message: "How many units of the product would you like to buy?"
        })
        .then(function (answer) {

            if (answer.amount < 1) {
                console.log("Please enter a value larger than 0.");
                amountRequested();
            } else if (answer.amount > stock) {
                console.log("Insufficient Quantity!");
            } else {
                console.log("inputed amount: " + answer.amount);
                inputAmt = answer.amount;
                receipt(inputID, inputAmt);
            }
        });
}

function receipt(id, amt) {
    console.log("id " + id + " amt: " + amt);
}
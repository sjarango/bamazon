DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Casio Watch", "watch", 14.95, 30), ("Rolex Watch", "watch", 8550.00, 3), ("Apple Watch", "watch", 399.00, 50), 
("Timex Watch", "watch", 10.00, 40), ("iPhone 11", "phone", 699.00, 500), ("iPhone 11 Pro", "phone", 999.00, 500), 
("Google Pixel 3", "phone", 499.00, 400), ("Google Pixel 4", "phone", 799.00, 500), ("Samsung Galaxy s10", "phone", 899.00, 500),
("Samsung Galaxy Note 10", "phone", 945, 400);

SELECT * FROM bamazon.products;

-- To get price of item using its id number
SELECT price, stock_quantity 
FROM products 
WHERE item_id="2";

-- Too update stock quantity of a specific item
UPDATE products 
SET stock_quantity = 30
WHERE item_id = 1;

-- Printing results for that updated item
SELECT * 
FROM products
WHERE item_id = 1;
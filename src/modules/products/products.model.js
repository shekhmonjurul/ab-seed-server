import dbConectionFunction from "../../utils/dbContectionFuntion.js"
import { productsdbConfig } from "../../config/database/products/products.database.config.js"
const db = dbConectionFunction(productsdbConfig)

export const insertProductsModel = async (product) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const {
            product_name,
            sku,
            short_description,
            long_description,
            category,
            reguler_price,
            sale_price,
            stock,
            category_id,
            main_image,
            product_photos

        } = product
        // 1. Insert into products
        const [orderResult] = await conn.query(
            `INSERT INTO products
       (product_name, sku, short_description, long_description, category, reguler_price, sale_price, stock, category_id, main_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                product_name,
                sku,
                short_description,
                long_description,
                category,
                reguler_price,
                sale_price,
                stock,
                category_id,
                main_image
            ]
        );

        const orderId = orderResult.insertId;

        // 2️⃣ Insert each product photos
        for (const photo of product_photos) {
            const [itemResult] = await conn.query(
                `INSERT INTO product_photos 
         (product_id, src)
         VALUES (?, ?)`,
                [
                    orderId,
                    photo?.src
                ]
            );

            const itemId = itemResult.insertId;
        }

        await conn.commit();
        console.log("Order Inserted Successfully ✅");
        return orderResult
    } catch (err) {
        await conn.rollback();
        console.error("Insert Failed ❌", err);
    } finally {
        conn.release();
    }
}


export const insertCatagoryModel = async (catagory) => {

    const sql = `
    INSERT INTO order_items 
    (category_name)
    VALUES (?)
    `

    const [rows] = await db.query(sql, [catagory])

    return rows

}




// CREATE TABLE products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     productName VARCHAR(255) NOT NULL,
//     sku VARCHAR(100) UNIQUE NOT NULL,
//     shortDescription TEXT,
//     longDescription TEXT,
//     category VARCHAR(100),
//     regulerPrice DECIMAL(10,2),
//     salePrice DECIMAL(10,2),
//     stock INT DEFAULT 0,
//     category_id INT,
//     mainImage VARCHAR(255),
//     date_time DATETIME DEFAULT CURRENT_TIMESTAMP
// );


// CREATE TABLE product_photos (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     product_id INT NOT NULL,
//     src VARCHAR(255) NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
// );
// CREATE TABLE IF NOT EXISTS category (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     category_name VARCHAR(255) NOT NULL,
//     datetime DATETIME DEFAULT CURRENT_TIMESTAMP
// );

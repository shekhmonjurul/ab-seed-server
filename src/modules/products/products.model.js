import dbConectionFunction from "../../utils/dbContectionFuntion.js"
// import { productsdbConfig } from "../../config/database/products/products.database.config.js"
// const db = dbConectionFunction(productsdbConfig)

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

export const getAllProdcutsModel = async (limit, offset) => {
  const sql = `
 
    SELECT 
      pro.id,
      pro.product_name,
      pro.sku,
      pro.short_description,
      pro.long_description,
      pro.category,
      pro.reguler_price,
      pro.sale_price,
      pro.stock,
      pro.category_id,
      pro.main_image,
      
      pto.id AS photo_id,
      pto.src
    FROM (
      SELECT * 
      FROM products
      ORDER BY products.id DESC
      LIMIT ? OFFSET ?
    ) pro
    LEFT JOIN product_photos pto ON pro.id = pto.product_id
  
  `;

  const [rows] = await db.query(sql, [limit, offset]);

  const countSql = `SELECT COUNT(*) AS total FROM products`;
  const [[{ total }]] = await db.query(countSql);

  const totalPage = Math.ceil(total / limit);

  if (rows.length === 0) return { products: [], totalPage, rowCount: 0 };

  const products = [];
  const productMap = new Map();

  for (const row of rows) {
    // Create product if not already mapped
    if (!productMap.has(row.id)) {
      productMap.set(row.id, {
        id: row.id,
        product_name: row.product_name,
        sku: row.sku,
        short_description: row.short_description,
        long_description: row.long_description,
        category: row.category,
        category_id: row.category_id,
        reguler_price: row.reguler_price,
        sale_price: row.sale_price,
        stock: row.stock,
        main_image: row.main_image,
        product_photos: []
      });
      products.push(productMap.get(row.id));
    }

    const product = productMap.get(row.id);

    // Push photo if exists
    if (row.photo_id && row.src) {
      const exists = product.product_photos.find(p => p.id === row.photo_id);
      if (!exists) {
        product.product_photos.push({
          id: row.photo_id,
          src: row.src
        });
      }
    }
  }

  return { products, totalPage, rowCount: total };
}

export const getSingelProdcutsModel = async (id) => {
  const sql = `
 
    SELECT 
      pro.id,
      pro.product_name,
      pro.sku,
      pro.short_description,
      pro.long_description,
      pro.category,
      pro.reguler_price,
      pro.sale_price,
      pro.stock,
      pro.category_id,
      pro.main_image,
      
      pto.id AS photo_id,
      pto.src
    FROM (
      SELECT * 
      FROM products
      WHERE products.id = ?
      ORDER BY products.id DESC
    ) pro
    LEFT JOIN product_photos pto ON pro.id = pto.product_id
  `;

  const [rows] = await db.query(sql, [id]);

  if (rows.length === 0) return { products: [], totalPage, rowCount: 0 };

  const products = [];
  const productMap = new Map();

  for (const row of rows) {
    // Create product if not already mapped
    if (!productMap.has(row.id)) {
      productMap.set(row.id, {
        id: row.id,
        product_name: row.product_name,
        sku: row.sku,
        short_description: row.short_description,
        long_description: row.long_description,
        category: row.category,
        category_id: row.category_id,
        reguler_price: row.reguler_price,
        sale_price: row.sale_price,
        stock: row.stock,
        main_image: row.main_image,
        product_photos: []
      });
      products.push(productMap.get(row.id));
    }

    const product = productMap.get(row.id);

    // Push photo if exists
    if (row.photo_id && row.src) {
      const exists = product.product_photos.find(p => p.id === row.photo_id);
      if (!exists) {
        product.product_photos.push({
          id: row.photo_id,
          src: row.src
        });
      }
    }
  }

  return { products };
}


export const updateProductModel = async (keys, values) => {
  const sql = `
  UPDATE products
  SET ${keys}
  WHERE id = ?
`
  const [result] = await db.query(sql, [...values])
  return result
}


export const insertCatagoryModel = async (catagory) => {

  const sql = `
    INSERT INTO category
    (category_name)
    VALUES (?)
    `

  const [rows] = await db.query(sql, [catagory])

  return rows

}


export const getAllCatagoryModel = async (limit, offset) => {

  const sql = `
    SELECT *
    FROM category
    LIMIT ? OFFSET ?
  `
  const [rows] = await db.query(sql, [limit, offset]);

  const countSql = `SELECT COUNT(*) AS total FROM category`;
  const [[{ total }]] = await db.query(countSql);

  const totalPage = Math.ceil(total / limit);

  return { rows, page: totalPage, rowCount: total }
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

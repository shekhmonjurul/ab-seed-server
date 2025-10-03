import db from "../../config/database/fraud/database.js"

// inser model herer
export const insert_fraud_checker = async (data) => {
  const sql = `INSERT INTO fraud_checker (mobile_number, total_parcels, total_delivered, total_cancel) VALUES (?, ?, ?, ?);`
  const [results, fields] = await db.query(sql, data)
  return results

}

export const insert_fraud_courier_history = async (fraudId, couriers) => {

  try {
    // Prepare values array for multiple insert
    const values = couriers?.map(c => [
      fraudId,
      c?.courier_name,
      c?.total_parcels,
      c?.total_delivered_parcels,
      c?.total_cancelled_parcels
    ]);

    // Execute multiple insert
    const sql = `INSERT INTO fraud_courier_history 
       (fraud_id, courier_name, total_parcels, total_delivered_parcels, total_cancelled_parcels)
       VALUES ?`
    const [result] = await db.query(sql, [values]);
    return result
  } catch (err) {
    console.error(err);
  }

}


// get data model herer
export const getFraudData = async (number) => {
  const sql = `SELECT 
    f.mobile_number,
    f.total_parcels,
    f.total_delivered,
    f.total_cancel,
    CONCAT('[', GROUP_CONCAT(
        CONCAT(
            '{"courier_name":"', c.courier_name,
            '","total_parcels":', c.total_parcels,
            ',"total_delivered_parcels":', c.total_delivered_parcels,
            ',"total_cancelled_parcels":', c.total_cancelled_parcels, '}'
        )
    ), ']') AS couriers_json
FROM fraud_checker f
LEFT JOIN fraud_courier_history c 
    ON f.id = c.fraud_id
WHERE f.mobile_number = ${number}
GROUP BY f.id;
`
  const [results, fields] = await db.query(sql, [number])
  return results
}


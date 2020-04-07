import {pool} from '../database-stuff/database-pool'
import {buildValues,toTitleCase} from '../database-stuff/database-queries'

// `CREATE TABLE IF NOT EXISTS paymentInfo(
//     id                      SERIAL PRIMARY KEY,
//     "orderId"               SERIAL NOT NULL,
//     "fullName"              VARCHAR(64) NOT NULL,
//     "cardNumber"            INTEGER NOT NULL,
//     "expiry"                INTEGER NOT NULL,
//     "cvv"                   INTEGER NOT NULL,
//     "totalCost"             INTEGER NOT NULL,
//     FOREIGN KEY ("orderId") REFERENCES orders("id") ON DELETE CASCADE
// );`

// given the payment details to an order create a new entry
// in the paymentinfo database
const newPaymentInfo = async (paymentInfo)=>{
    try{
        const columns = await Object.keys(paymentInfo).map(param=>`\"${param}\"`)
        const values = await buildValues(Object.values(paymentInfo))
        let paymentEntry = await pool.query(
            `INSERT INTO paymentInfo(${columns})
            VALUES (${values})
            RETURNING *`
            ,[...Object.values(paymentInfo)]
        )
        return paymentEntry.rows[0]
    }catch(error){
        console.log(error)
        return {error}
    }
}

export {
    newPaymentInfo,
}
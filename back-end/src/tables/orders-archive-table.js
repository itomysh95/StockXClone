import {pool} from '../database-stuff/database-pool'
import {buildValues,toTitleCase} from '../database-stuff/database-queries'


// `CREATE TABLE IF NOT EXISTS ordersArchive(
//     id                  SERIAL PRIMARY KEY,
//     "orderId"           SERIAL NOT NULL,
//     FOREIGN KEY ("orderId") REFERENCES orders("id") ON DELETE CASCADE
// ) `
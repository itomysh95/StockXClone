import {pool} from '../database-stuff/database-pool'
import {updateQueryBuilder} from '../database-stuff/database-queries'

const codeParams = [
    `\"codeValue\"`,
    `\"discount\"`,
    `\"uses\"`
]

// TODO
// validate a given code
const validCode = async(code)=>{
    try{
        const result = await pool.query(
            `UPDATE codes 
            SET ${codeParams[2]}=
            WHERE LOWER ${codeParams[0]} = $1
            RETURNING *`,
            [code.value.toLowerCase()]
        )
    }catch(error){
        return {error}
    }
}

export{
    validCode
}
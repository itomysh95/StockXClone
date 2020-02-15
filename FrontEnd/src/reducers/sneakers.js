const sneakersReducerDefaultState=[]

const sneakersReducer = (state=sneakersReducerDefaultState,action)=>{
    switch(action.type){
        // get the sneaker info from database
        case 'GET_SNEAKER':
            return [

            ]
        // if the sneaker does not exist in the state    
        case 'ADD_NEW_SNEAKER':
            return [

            ]
        // add a quantity of sneakers
        case 'ADD_SNEAKER':
            return[

            ]
        // remove a quantity of sneakers
        case 'REMOVE_SNEAKER':
            return[

            ]
        // todo 
        case 'GET_LAST_SELL_PRICE':
            return[
                   
            ]
        default:
            return state;
    }
}

export default sneakersReducer
// Sneaker actions

// add a new sneaker to the sneaker database?
export const addSneaker=(sneaker)=>({
    type:'ADD_SNEAKER',
    sneaker
})

// takes in a sneaker name and get the last sell price of a sneaker
export const getLastSellPrice=(sneakerName)=>({
    type:'GET_LAST_SELL_PRICE',
    sneakerName
})

// takes in a sneaker name get the quantity of sneakers in stock
export const getQuantity=(sneakerName)=>({
    
})

// takes in a sneaker name get the highest bid price of a sneaker
export const getHighestBidPrice=(sneakerName)=>({

})

// takes in a sneaker name get all the bid prices of a sneaker
export const getBidPrices=(sneakerName)=>({

})

// takes in a sneaker name get the lowest ask price of a sneaker
export const getLowestAskPrice=(sneakerName)=>({

})

// takes in a sneaker name get all the ask price of a sneaker
export const getAllAskPrice=(sneakerName)=>({
    type:'GET_ALL_ASK_PRICE',
    sneakerName
})

// takes in a sneaker name get the amount sold of the sneaker
export const getAmountSold=(sneakerName)=>({

})

// takes in a sneaker name get information on the sneaker
export const getSneakerInfo=(sneakerName)=>({

})
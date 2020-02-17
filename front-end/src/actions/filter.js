const MAX_PRICE = 99999
const MIN_PRICE = 0

// filter by text
const setTextFilter=(text='')=>({
    type: 'SET_TEXT_FILTER',
    text
})

// sort by price ascending
const sortByPriceLow=()=>({
    type: 'SORT_BY_PRICE_LOW'
})

// sort by price descending
const sortByPriceHigh=()=>({
    type: 'SORT_BY_PRICE_HIGH'
})

// price filter default MIN_PRICE & MAX_PRICE
const setPriceFilter=(min=MIN_PRICE,max=MAX_PRICE)=>{
    return({
        type: 'SET_PRICE_FILTER',
        min,
        max
    })
}
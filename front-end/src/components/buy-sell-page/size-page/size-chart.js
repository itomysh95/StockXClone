import React from 'react'

// component for displaying all the current sizes/prices
const SizeChart = (props)=>{
    let color='light-green';
    let bid='Bid'
    if(!props.buy){
        color = 'red'
        bid='Sell'
    }
    let counter = -1;
    let holder = {}
    let temp=[]
    let i
    let sizePrices = props.sizeData;
    let sizes = Object.keys(sizePrices)
    // to create 4 table cells per row
    const createTable=()=>{
        // for each of the sizes
        for(i=0;i<sizes.length;i++){
            // every 4th item we make a new row
            if(i%4===0){
                counter +=1
                // if there are items to be added to the new row
                if(temp.length){
                    holder[counter]=temp
                    // empty it for next row
                    temp=[]
                }
            }
            temp.push(sizes[i])
        }
        // if there isn't a full set of 4
        if(temp.length){
            counter+=1
            holder[counter]=temp
        }
    }
    createTable()
    return (
        <div>
            <table>
                <tbody>
                    {
                        Object.keys(holder).map((rowNum)=>{
                            return(
                                <tr>
                                    {
                                        holder[rowNum].map((size)=>{
                                            return(
                                                <td>
                                                    <button type="button" className={`size-buy-${props.buy}-buttons`} onClick={()=>{   
                                                        props.setSizeInfo({
                                                            size:size/10,
                                                            price:sizePrices[size][0],
                                                            id:sizePrices[size][1]
                                                        })
                                                        props.screens('payment')
                                                    }}>
                                                        <span>{`US${size/10}`}</span>
                                                        <br/>
                                                        <span className={`font-color-${color}`}>{`${sizePrices[size][0]||`${bid}`}`}</span>
                                                    </button>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='side-by-side container'>
            </div> 
        </div>
    )
}

export default SizeChart
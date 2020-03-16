import React,{useState, useEffect} from 'react';
import PageEnd from '../page-bottom/page-end'
import ItemHeader from './item-header';
import ItemPicture from './item-picture'
import {serverURL} from '../../../config/config'
import ItemBuySellOptions from './item-buy-sell-options'
import ItemInfo from './item-info'
import ItemStats from './item-stats'
import RelatedItem from './related-item'
import ItemSalesHistory from './item-sales-history'

const ItemPage = (props)=>{
    const [item,setItem] = useState([])
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        const fetchSneaker = async()=>{
            try{
                setIsLoading(true)
                const res = await fetch(`${serverURL}/sneaker/retrieve/name/${props.match.params.name}`)
                const item = await res.json()
                setItem({...item.data})
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        fetchSneaker()
    },[])
    return(
        <div>
            {isLoading? <p>Loading...</p>:
                <div>
                    <ItemHeader item={item} />
                    <ItemBuySellOptions sneakerName={item.sneakerName} />
                    <ItemPicture item={item} />
                    <ItemInfo item={item} />
                    <ItemStats item={item} />
                    <RelatedItem item={item} />
                    <ItemSalesHistory item={item}/>
                    <PageEnd />
                </div>
            }
        </div>
    )
}

export default ItemPage
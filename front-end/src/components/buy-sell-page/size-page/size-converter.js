//size convert calculator 
const menUSASizeConverter = (mensUSSize=0)=>{
    let eu=mensUSSize+33;
    if(mensUSSize%1!==0){
        eu+=0.5
    }
    return({
        us:mensUSSize,
        uk:mensUSSize-1,
        eu,
        w:mensUSSize+1.5
    })
}

export default menUSASizeConverter
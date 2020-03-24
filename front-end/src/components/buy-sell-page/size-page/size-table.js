import React from 'react'
import menUSASizeConverter from './size-converter'

// component for rendering size conversion chart
const SizeTable = ()=>{
    let whiteRow = 'background-c-white'
    let white = true;
    let USSize = []
    let i;
    // set up the US men's shoe sizes
    for(i=3;i<19;i++){
        USSize.push(i)
        USSize.push(i+0.5)
    }

    return(
        <div>
            <div className='container'>
                <div className='size-table-header'>
                    <table>
                        <thead>
                            <tr>
                                <th>US</th>
                                <th>UK</th>
                                <th>EU</th>
                                <th>W</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='size-table-scroll'>
                    <table className='size-table-data'>    
                        <tbody>
                        {
                            USSize.map(size=>{
                                const {us,uk,eu,w} = menUSASizeConverter(size)
                                if(!white){
                                    whiteRow = 'background-c-light-grey'
                                }
                                else{
                                    whiteRow = 'background-c-white'
                                }
                                white = !white
                                return(
                                <tr className={`${whiteRow}`}>
                                    <td>{`${us}`}</td>
                                    <td>{`${uk}`}</td>
                                    <td>{`${eu}`}</td>
                                    <td>{`${w}`}</td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SizeTable
import {useState}  from 'react';
import './tableGnrlStyle.css'


export default function DisplayTbl1({header, data}){  //not much customization - just one row header n simple disply (no sort, filter, ...)
    let [schildSt, modif] = useState(3)
    
    function sChildBtn(){
        modif(schildSt+1);
    }

    return (<>
        <p>this content is from displayTbl1</p>
        
        <table>
            <thead>
                <tr>
                    { header.map(elem=>{return(<th>{elem.header}</th>)}) }
                </tr>
            </thead>
            <tbody>
                {data.map(obj=>{
                    let listOfData=[];
                    for(var key in obj)
                    {listOfData.push(<td>{obj[key]}</td>)}
                    return(<tr>{listOfData.map(elem=>elem)}</tr>)    
                    })
                }
               
            </tbody>
        </table>


        
        
    </>)
}


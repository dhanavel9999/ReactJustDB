import { useState } from "react"


export default function CustSelect1(){
    let [cellVal, cellModif]=useState('')
    let [cellVal2, cell2Modif]=useState('hakuna Matata')

    function handleDDLChange(e){
        cellModif(e.target.value)
    }

    return (<select name="cars"  onChange={handleDDLChange} >
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                    <option value="current">current</option>
                </select>)
}
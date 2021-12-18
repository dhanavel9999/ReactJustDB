import {useState}  from 'react';
import DispTbl  from './displayTbl1'


export default function FastAPIDisp(){
    let [schildSt, modif] = useState(3)
    //constants, common
    let header = 'header', accessor ='accessor'
    let tblHeadVar = [{header:'Staff ID', accessor:'StaffID'}, 
        {header:'Staff Name', accessor:'StaffName'}
    ]

    let tblDataVar = [
        {"StaffID":1,"StaffName":"mihan"},
        {"StaffID":2,"StaffName":"peta"},
        {"StaffID":3,"StaffName":"monty"},
        
    ]
    let [tblHead, HeadModif] = useState(tblHeadVar)
    let [tblData, DataModif] = useState(tblDataVar)

    function sChildBtn(){
        modif(schildSt+1);
    }

    async function bindToTable(){
        let response = await fetch('http://127.0.0.1:8000/table')
        let data = await response.json()
        //console.log(data)
        DataModif(data)
    }

    return (<>
        
        <p>{schildSt}</p>
        <DispTbl data={tblData} header={tblHead} />
        <button onClick={()=>sChildBtn()} >Content</button>
        <button onClick={()=>bindToTable()} >Refresh</button>
    </>)
}


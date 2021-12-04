import {useState, useRef}  from 'react';

import Tbl from './childTbl1'
import './hook1.css'
import  SelectComp from './selectComp'
import  TextComp from './inputComp'
import { useEffect } from 'react/cjs/react.development';



export default function UpperCase(){
    let selecData2=[
        {Display:'one', key: '1', value :1 }, 
        {Display:'two', key: '2', value :2 }, 
        {Display:'three', key: '3', value :3 }, 
        {Display:'four', key: '4', value :4 }
    ]
    let [selecData1, DataModif]=useState(selecData2)
    
    
    let [state1, s1modif] = useState(1)
    let RefVar = useRef(2)
    function StBtnClick(){
        s1modif(state1+1)
    }
    function RefBtnClick(){
        RefVar.current = RefVar.current +1;
    }
    
    function handleChange(e){
        
        ValRef.current.selec1=e.target.value;
        ValRef.current.selec2=e.target.value;
        StBtnClick()
    }
    let ValRef = useRef({select1:'', 
    select2:''}) 
    

    //process simi to componentDidMount
    // useEffect(()=>{
    //     ValRef.current.selec1=null;
    //     ValRef.current.selec2=null;
    // }, [])
   
    var tblData2 = useRef([
        { id: 1, studentName: 'john', lastName: 'cena', phone: '3472', xtraCol: 'opel', NewCol:'', age: '12', progress: '34', gender: 'male' },
        { id: 2, studentName: 'steph', lastName: 'nima', phone: '2342', xtraCol: 'lambo', NewCol:'',  age: '21', progress: '53', gender: 'female' },
        { id: 3, studentName: 'ortan', lastName: 'porto', phone: '09329', xtraCol: 'opel', NewCol:'', age: '32', progress: '82', gender: 'male' },
        { id: 4, studentName: 'utan', lastName: 'bafi', phone: '85618', xtraCol: 'chevro', NewCol:'', age: '16', progress: '16', gender: 'female'  },
        { id: 5, studentName: 'braxo', lastName: 'siytra', phone: '93612', xtraCol: 'opel', NewCol:'', age: '31', progress: '38', gender: 'male' },
        { id: 6, studentName: 'steph', lastName: 'niqma', phone: '2342', xtraCol: 'lambo', NewCol:'', age: '21', progress: '53', gender: 'female' },
        { id: 7, studentName: 'ortan', lastName: 'porkto', phone: '09329', xtraCol: 'opel', NewCol:'', age: '32', progress: '82', gender: 'male' },
        { id: 8, studentName: 'utan', lastName: 'baffri', phone: '85618', xtraCol: 'chevro', NewCol:'', age: '16', progress: '16', gender: 'female' },
        { id: 9, studentName: 'feitan', lastName: 'sitra', phone: '93612', xtraCol: 'maru', NewCol:'', age: '31', progress: '38', gender: 'male' },
        { id: 10, studentName: 'mongo', lastName: 'nima', phone: '918874', xtraCol: 'lambo', NewCol:'', age: '21', progress: '53', gender: 'female' },
        { id: 11, studentName: 'brock', lastName: 'porto', phone: '298830', xtraCol: 'maru', NewCol:'', age: '32', progress: '82', gender: 'male' },
        { id: 12, studentName: 'hikari', lastName: 'bafi', phone: '634534', xtraCol: 'chevro', NewCol:'', age: '16', progress: '16', gender: 'female' },
        { id: 13, studentName: 'nastro', lastName: 'sitra', phone: '23462', xtraCol: 'maru', NewCol:'', age: '31', progress: '38', gender: 'male' },
        { id: 14, studentName: 'grao', lastName: 'loqu', phone: '923890', xtraCol: 'hyun', NewCol:'', age: '6', progress: '95', gender: 'female'  },
        { id: 15, studentName: 'chibi', lastName: 'duko', phone: '16774', xtraCol: 'maru', NewCol:'', age: '9', progress: '65', gender: 'female'  },
        { id: 16, studentName: 'setero', lastName: 'kian', phone: '82689', xtraCol: 'maru', NewCol:'', age: '19', progress: '97', gender: 'male'  }
    ])

    // useEffect(()=>{
    //     StBtnClick()
    // },
    // [ JSON.stringify(ValRef.current), 
    //     JSON.stringify(tblData2.current) ]
    // )

    function tblDataChng(e, newTblData){
        tblData2.current=newTblData;
        //StBtnClick()
        //s1modif(state1+1)
    }

    return (<>
        <p>hello world from outside main</p>
        
        <SelectComp data={selecData1} value={ValRef.current.selec1} onChange={handleChange} />
        <SelectComp data={selecData1} value={ValRef.current.selec2} />
        
        <p >{state1}</p>
        <p>{RefVar.current}</p>
        
        <button onClick ={()=>StBtnClick()} className='mark' >Change State</button><br/>
        <button onClick ={()=>RefBtnClick()}>Change Ref</button>
        
        <Tbl tblData={tblData2.current} DataChangeEvt={tblDataChng}  />
    </>)
}

//<Tbl/>
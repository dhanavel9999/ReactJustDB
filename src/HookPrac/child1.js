import {useState}  from 'react';
import SChild  from './subChild1'

export default function Child(){
    let [childSt, modif] = useState(3)
    
    function ChildBtn(){
        modif(childSt+1);
    }

    return (<>
        <SChild/>
        <p>{childSt}</p>
        <button onClick={()=>ChildBtn()} >Child Button</button>
    </>)
}


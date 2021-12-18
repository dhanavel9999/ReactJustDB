import {useState}  from 'react';


export default function SubChild(){
    let [schildSt, modif] = useState(3)
    
    function sChildBtn(){
        modif(schildSt+1);
    }

    return (<>
        
        <p>{schildSt}</p>
        <button onClick={()=>sChildBtn()} >sub-Child Button</button>
    </>)
}


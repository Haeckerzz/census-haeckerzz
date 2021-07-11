import { useEffect } from "react";

const Faltu = () => {
    useEffect(()=>{
        fetch('http://localhost:8081/members')
        .then(response =>response.json())
        .then(response=>{
            console.log(response);
        })
    },[])


    return ( 
        <h1>Hello</h1>
     );
}
 
export default Faltu;
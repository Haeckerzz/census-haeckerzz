import  { useState,useEffect } from 'react';
const UserFetch = (ids) => {
    var [data,setData]=useState(null);

    useEffect(()=>{
        ids.map((id,index) => (
            fetch("http://localhost:8000/member?id="+id)
            .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response =>{
                    console.log("prev",data,"next",response);
                    if (data){
                        setData(data.concat(response));
                    }
                    else{
                        setData(response);
                    } 
                }
                )
        )) 
    },[]);

    return {data};
}
 
export default UserFetch;
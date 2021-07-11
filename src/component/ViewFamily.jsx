import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import GetTable from "./GetTable";
import {JSON_API} from './Constant';

const ViewFamily = () => {
    const {id} =useParams();
    const lurl = JSON_API+"/member?applicationID="+id;
    const [data,setData]=useState(null);
    const history = useHistory();

    useEffect(()=>{
        fetch(lurl)
        .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response =>{
                setData(response);
                console.log(response);
            }
            );
    },[])   
    const handleSubmit = (e) =>{
        history.push(`/create/${id}`);
    }     
    const handleSubmit2 = (e) =>{
        const applicationStatus="Approved";
        const applicationID=id.replace("A-00",""); 
        const application={applicationStatus};
        fetch( JSON_API+"/application/"+applicationID,{
            method:'PATCH',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(application)
        })
        .then(response => response.json())
        .catch(error => console.error("Error in adding:", error))
        .then(response => console.log("Success:", JSON.stringify(response)));
        history.push(`/search`);
    }


    return ( 
        <div className="view-family">
             {data &&
            <h2>Welcome back {data[0].firstName} {data[0].lastName},</h2>}
            {data &&
            <GetTable members ={data}/>}
            {data && <button type="submit" name="add" onClick={handleSubmit}>Add Member</button>}
            {data && <button type="submit" name="submit" onClick={handleSubmit2}>Submit</button>}
        </div>
     );
}
 
export default ViewFamily;
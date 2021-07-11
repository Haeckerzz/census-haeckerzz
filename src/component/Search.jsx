import {useState} from 'react';
import { useHistory } from "react-router-dom";
import {JSON_API} from './Constant';
const Search = () => {
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [dob,setDob]=useState('');
    const [applicationID,setApplicationID]=useState('');
    const [applicationStatus,setApplicationStatus]=useState('Approved');
    const [data,setData]=useState(null);
    const [pending,setpending]=useState(false);
    const [click,setClick]=useState(false);
    const history = useHistory();


    const handleSubmit = (e) =>{
        setpending(true);
        e.preventDefault();
        var lurl=JSON_API+"/application?";
        if (firstName){
            lurl+= ("&firstName="+firstName);
        }
        if (lastName){
            lurl+= ("&lastName="+lastName);
        }
        if (dob){
            lurl+= ("&dob="+dob);
        }
        if (applicationID){
            lurl+= ("&applicationID="+applicationID);
        }
        if ( lurl!==JSON_API+"/application?" && applicationStatus){
            lurl+= ("&applicationStatus="+applicationStatus);
        }
        if (lurl === JSON_API+"/application?"){
            setpending(false);
            return;
        }
        console.log(lurl);
        fetch(lurl)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response =>{
            setData(response);
            setClick(true);
            if (!response.length){
                setpending(false);
            }
            else{
                history.push(`/viewfamily/${response[0].applicationID}`);
            }
        });
        

    }

    return ( 
        <div className="search">
            <h2>User Search Application</h2>
            <form onSubmit={handleSubmit}>
                <label >First Name:</label>
                    <input 
                        type="text" 
                        value ={firstName}
                        onChange={(event)=>setFirstName(event.target.value)}
                    />
                <label >Last Name:</label>
                    <input 
                        type="text"  
                        value ={lastName}
                        onChange={(event)=>setLastName(event.target.value)}
                    />

                <label >Date of Birth:</label>
                    <input 
                        type="date" 
                        value ={dob}
                        onChange={(event)=>setDob(event.target.value)}
                    />

                <label >Application Id:</label>
                    <input 
                        type="text"  
                        value ={applicationID}
                        onChange={(event)=>setApplicationID(event.target.value)}
                    />

                <label  >Application Status:</label>
                    <select
                    value={applicationStatus}
                    onChange={(event)=>setApplicationStatus(event.target.value)}>
                        <option value="Approved" >Approved</option>
                        <option value="InProcess" >InProcess</option>
                    </select>

                { !pending &&<button type="submit" name="action" value="update">Search</button>}
                { pending && <button disabled>Searching Member.......</button>}
                { click && !data.length &&<p>No Match Found</p>}
            </form>
        </div>
     );
}
 
export default Search;
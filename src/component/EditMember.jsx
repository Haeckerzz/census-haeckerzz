import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {JSON_API} from './Constant';

const EditMember = () => {
    const {id} = useParams();
    const [firstName,setFirstName]=useState(null);
    const [middleName,setMiddleName]=useState(null);
    const [lastName,setLastName]=useState(null);
    const [suffix,setSuffix]=useState(null);
    const [dob,setDob]=useState(null);
    const [gender,setGender]=useState(null);
    const [data,setData]=useState(null);
    const [relation,setRelation]=useState(null);
    const [applicationID,setApplicationID]=useState(null);
    const history = useHistory();

    useEffect(()=>{
        fetch(`${JSON_API}/member?id=${id}`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response =>{
            setData(response[0]);
            setFirstName(response[0].firstName);
            setMiddleName(response[0].middleName);
            setLastName(response[0].lastName);
            setSuffix(response[0].suffix);
            setDob(response[0].dob);
            setGender(response[0].gender);
            setRelation(response[0].relation);
            setApplicationID(response[0].applicationID);
        });
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(e.nativeEvent.submitter.name==="update"){
            let member={firstName,middleName,lastName,suffix,dob,gender,relation};
            if (suffix && relation){
                let status="Completed";
                member = {firstName,middleName,lastName,suffix,dob,gender,relation,status};
            }
            fetch(`${JSON_API}/member/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(member)
            })
            .then(response => response.json())
            .catch(error => console.error("Error in adding:", error))
            .then(response => console.log("Success:", JSON.stringify(response)));
            history.push(`/viewfamily/${applicationID}`);
            return;
        }
        else{
            const member = {firstName,middleName,lastName,suffix,dob,gender,relation};
            fetch(`${JSON_API}/member/${id}`, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(member)
            })
            .then(response => response.json())
            .catch(error => console.error("Error in adding:", error))
            .then(response => console.log("Success:", JSON.stringify(response)));
            history.push(`/viewfamily/${applicationID}`);
            return;

        } 
    }

    return ( 
        <div className="edit">
            <h2>Edit Details</h2>
            {data && <form onSubmit={handleSubmit}>
                <label className="required">First Name:</label>
                    <input 
                        type="text"
                        required
                        value ={firstName}
                        onChange={(event)=>setFirstName(event.target.value)}
                    />

                <label>Middle Name:</label>
                    <input 
                        type="text"
                        value ={middleName}
                        onChange={(event)=>setMiddleName(event.target.value)}
                    />

                <label className="required">Last Name:</label>
                    <input 
                        type="text"
                        required
                        value ={lastName}
                        onChange={(event)=>setLastName(event.target.value)}
                    />

                <label>Suffix:</label>
                    <select
                    value={suffix}
                    onChange={(event)=>setSuffix(event.target.value)}>
                        <option value="None" >None.</option>
                        <option value="Mr." >Mr.</option>
                        <option value="Mrs." >Mrs.</option>
                        <option value="Ms." >Ms.</option>
                        <option value="Miss." >Miss.</option>
                    </select>

                <label className="required">Date of Birth:</label>
                    <input 
                        type="date"
                        required
                        value ={dob}
                        onChange={(event)=>setDob(event.target.value)}
                    />

                <label required className="required">Gender:</label>
                    <select
                    value={gender}
                    onChange={(event)=>setGender(event.target.value)}>
                        <option value="None" >None.</option>
                        <option value="Male" >Male</option>
                        <option value="Female" >Female</option>
                        <option value="Transgender" >Transgender</option>
                        <option value="Others" >Others</option>
                    </select>

                <label >Relation:</label>
                    <select
                    value={relation}
                    onChange={(event)=>setRelation(event.target.value)}>
                        <option value="Head" >Head</option>
                        <option value="Husband" >Husband</option>
                        <option value="Wife" >Wife</option>
                        <option value="Son" >Son</option>
                        <option value="Daughter" >Daughter</option>
                    </select>
                { <button type="submit" name="update" value="update">Update Member</button>}
                { <button type="delete" name="delete" value="delete">Delete Member</button>}
            </form>}
        </div>
    );
}
 
export default EditMember;
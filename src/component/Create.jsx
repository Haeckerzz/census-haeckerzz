import {useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
const Create = () => {
    const {id} = useParams();
    const [firstName,setFirstName]=useState('');
    const [middleName,setMiddleName]=useState('');
    const [lastName,setLastName]=useState('');
    const [suffix,setSuffix]=useState('None');
    const [dob,setDob]=useState('');
    const [gender,setGender]=useState('None');
    const [relation,setRelation]=useState(null);
    const [pending,setpending]=useState(false);
    var idd;
    var applicationID;

    const history = useHistory();

    const handleSubmit = (e) =>{
        console.log(e);
        e.preventDefault();
        let status="";
        if (suffix && relation){
            status="Completed";
        }
        else{
            status="InProcess"
        }
        if(!id){
            status="InProcess";
            let application = {firstName,lastName,dob,status};
            fetch('http://localhost:8000/application',{
                method:'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(application)
            }).then(response => response.json())
            .then(response =>{
                idd=response.id;
                applicationID="A-"+idd;
                const appl={applicationID};
                fetch('http://localhost:8000/application/'+idd,{
                method:'PATCH',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(appl)
            })
            .then(response =>{
                let member = {firstName,middleName,lastName,suffix,dob,gender,relation,status};
                console.log(applicationID); 
                member["applicationID"]=applicationID;              
                fetch('http://localhost:8000/member',{
                    method:'POST',
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(member)
                }).then(()=>{
                    setpending(true);
                    history.push(`/viewfamily/${applicationID}`);
                    return;
                })
            })
            })
        }
        else{
            let member = {firstName,middleName,lastName,suffix,dob,gender,relation,status};
            member["applicationID"]=id;
            fetch('http://localhost:8000/member',{
                method:'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(member)
            }).then(()=>{
                setpending(true);
                 history.push(`/viewfamily/${id}`);
                 return;
            })
        }

    }
    return ( 
        <div className="create">
            <h2>Create Application</h2>
            <form onSubmit={handleSubmit}>
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
                { !pending &&<button type="submit" name="action" value="update">Add Member</button>}
                { !pending &&<button type="submit" name="action" value="exit">Save and Exit</button>}
                { pending && <button disabled>Adding Member.......</button>}
            </form>
        </div>
     );
}
export default Create;
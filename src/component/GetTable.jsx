import { Link } from "react-router-dom";

const GetTable = ({members}) => {
    console.log(members);
    return (  
    <div className="table">
        <table>
            <tr>
                <th>Suffix</th>
                <th>FirstName</th>
                <th>MiddleName</th>
                <th>LastName</th>
                <th >DOB</th>
                <th>Gender</th>
                <th>Relation</th>
                <th>Status</th>
                <th>Edit</th>
            </tr>

            {members.map( (member,index) =>(
                    <tr>
                        <td>{member.suffix}</td>
                        <td>{member.firstName}</td>
                        <td>{member.middleName}</td>
                        <td>{member.lastName}</td>
                        <td >{member.dob}</td>
                        <td>{member.gender}</td>
                        <td>{member.relation}</td>
                        <td>{member.status}</td>
                        <Link to ={`/editmember/${member.id}`} ><u>Edit</u></Link>
                    </tr>
            ))}
        </table>
    </div>

    );
}
 
export default GetTable;


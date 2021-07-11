import { Link } from "react-router-dom";
const Navbar = () => {
    return (  
        <nav className="navbar">
            <a href="/" className="home"><h1>The Census</h1></a>
            <div className="links">
                <Link to="/create" className="create" style ={{
                    color: "White",
                    backgroundColor:"#f1356d",
                    borderRadius:"8px"
                }}>Create Application</Link>

                <Link to="/search" className="search" style ={{
                    color: "White",
                    backgroundColor:"#f1356d",
                    borderRadius:"8px"
                }}>Search Application</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;
import api from "../api/userManagement";
import { useEffect, useState } from "react"
function Users() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");


    useEffect(()=> {
        getUsers();
    }, []);
  
    //Fetching users data using Axios
    const getUsers = async() => {
    const response = await api.get("/users");
    const data = await response.data;
    setUsers(data);
    }

    return (
        <div className="drop-down">
            <div>
                <h2>Select any of the name below:</h2>
                <select onChange={(e) => {setName(e.target.value)}}>
                    {
                        users.map((user) => {
                            return <option key={user.id}>{user.name}</option>
                        })
                    }
                </select>
            </div>
                <h2>You have selected the name: <span id="name">{name}</span></h2>
        </div>
    )
}

export default Users;

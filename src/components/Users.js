import api from "../api/userManagement";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material"

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

    const UserData = users.map((user) => user.name).sort();

    return (
        <div className="drop-down">
            <div>
                {/* {Search /Drop Down with Names sorted in Ascending order} */}
                
                <Autocomplete
                    
                    disablePortal
                    options={UserData}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} onSelect={(e) => {setName(e.target.value)}} label="Search or Choose the user name" />}
                />
                
            </div>
                <h2>You have selected the name: <span id="name">{
                    (UserData.includes(name)) ? name :  null
                }</span></h2>
        </div>
    )
}

export default Users;

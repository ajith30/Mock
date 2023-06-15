import api from "../api/userManagement";
import { useEffect, useState } from "react";
import { Autocomplete, Card, CardContent, TextField } from "@mui/material"

function Users() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [user, setUser] = useState({});

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

    const getUserJson = (name) => {
        const person = users.filter((user) => user.name === name)[0];
        setUser(person);
    }

    return (
        <div className="drop-down">
            <div>
                {/* {Search /Drop Down with Names sorted in Ascending order} */}

                <Autocomplete
                    
                    disablePortal
                    options={UserData}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} onSelect={(e) => {setName(e.target.value); getUserJson(e.target.value)}} label="Search or Choose the user name" />}
                />
                
            </div>
            <div>
                {(UserData.includes(name)) 
                ? 
                    <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <pre>{JSON.stringify(user, null, 2)}</pre>
                    </CardContent>
                </Card>
                : null
                }
            </div>
        </div>
    )
}

export default Users;

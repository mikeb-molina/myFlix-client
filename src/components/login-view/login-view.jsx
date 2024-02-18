import React, { useState } from "react";

export const LoginView = () => {
    const [username, setUsername] =useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        //prevents reloading of entire page which is default behavior
        event.preventDefault();

        const data ={
            access: username,
            secret: password
        };

        fetch("https://mikes-movie-flix-5278ac249606.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                    type= "text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </label>
            <label>
                Password:
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};
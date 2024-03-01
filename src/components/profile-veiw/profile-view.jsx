import {useState} from "react";
import {Col, Row, Container} from "react-bootstrap";
import {Button, Card, Form} from "react-bootstrap";

export const ProfileView = ({user, token, movies, setUser}) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const handleupdate = (event) => {
        event.preventDefault();

        const data= {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://mikes-movie-flix-5278ac249606.herokuapp.com/users/${user.Username}", {
            method: "PUT",
            Body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then ( async (response) => {
            if(response.ok) {
                response.json();
                alert("Update was successful");
                window.location.reload();
            } else{
                alert("Update failed")
            }
        });
    }
}
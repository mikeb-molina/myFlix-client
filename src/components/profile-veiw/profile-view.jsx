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
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={5}>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Profile</Card.Title>
                            <Card.Img variant="top" src="" className="w-50"/>
                            <Card.Text>Username: {user.Username}</Card.Text>
                            <Card.Text>Email: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {user.Birthday}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Form onSubmit={handleupdate}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            minLength="3"
                            placeholder={user.Username}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={user.Email}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            placeholder={user.Birthday}
                            />
                        </Form.Group>
                        <Button type="submit" onClick={handleupdate} className="mt-2">Update</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
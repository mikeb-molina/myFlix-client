import React from "react";
import { useState, useEffect } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-veiw/profile-view";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import {Form} from "react-bootstrap";

import{ BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch(`https://mikes-movie-flix-5278ac249606.herokuapp.com/movies`, {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => ({
                        id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: movie.Genre,
                        Director: movie.Director,
                        Featured: movie.Featured
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error('Failed to fetch movies', error);
            });
    }, [token]);

    const addFav =(id) => {
        fetch(`https://mikes-movie-flix-5278ac249606.herokuapp.com/users/${user.Username}/movies/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then ((response) => {
            if(response.ok) {
                return response.json();
            } else {
                alert("Failed to add")
            }
        }).then((updatedUser) =>{
            if(updatedUser) {
                alert("Added successfully to favorite movies");
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        }).catch(error => {
            console.error("Error adding movie to favorites: ", error);
        });
    };

    const removeFav =(id) => {
        fetch(`https://mikes-movie-flix-5278ac249606.herokuapp.com/users/${user.Username}/movies/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then ((response) => {
            if(response.ok) {
                return response.json();
            } else {
                alert("Failed to remove")
            }
        }).then((user) =>{
            if(user) {
                alert("Removed successfully from favorite movies");
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        }).catch(error => {
            console.error("Error removing from favorites: ", error);
        });
    };

        return (
            <BrowserRouter>
                <NavigationBar
                user={user}
                onLoggedOut={() =>{
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                }}
                />
                <Form>
                    <InputGroup className="my-4">
                    <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for a movie..."
                    />
                    </InputGroup>
                </Form>
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route path="/signup" element={
                                     user ? (
                                        <Navigate to ="/" />
                                    ): (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )
                                }/>
                
                        <Route path="/login" element={
                                user ? (
                                    <Navigate to ="/" />
                                ): (
                                    <Col md={5}>
                                        <LoginView 
                                            onLoggedIn={(loggedInUser, loggedInToken) => {
                                                setUser(loggedInUser);
                                                setToken(loggedInToken);
                                                localStorage.setItem("user", JSON.stringify(loggedInUser));
                                                localStorage.setItem("token", loggedInToken);
                                            }}/>
                                    </Col>
                                )}/>
                            <Route path="/movies/:movieId" element={
                                    !user ? (
                                        <Navigate to ="/login" replace />
                                    ): movies.length === 0 ? (
                                        <Col>The list is empty!</Col>                           
                                    ): (
                                        <Col md={8}>
                                            <MovieView movies={movies} addFav={addFav} removeFav={removeFav} />
                                        </Col>
                                    )
                                }/>
                             
                            <Route path="/" element={
                                    !user ? (
                                        <Navigate to="/login" replace />
                                    ): movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ): (
                                        
                                        <>
                                        {movies
                                        .filter((movie) => {
                                            return search.toLocaleLowerCase() === ""
                                            ? movie
                                            :movie.title?.toLocaleLowerCase().includes(search);
                                        })
                                        
                                        .map((movie) => (
                                            <Col className="mb-4" key={movie.id} lg={3} md={4} sm={12}>
                                                <MovieCard 
                                                movie={movie} 
                                                addFav={addFav}
                                                removeFav={removeFav}
                                                isFavorite={user?.FavoriteMovies.includes(movie.id)}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )
                            }/>
                    <Route path="/profile" element={
                        !user ? (
                            <Navigate to="/login" replace/>
                        ): (
                            <Col>
                            <ProfileView user={user} token={token} movies={movies} addFav={addFav} removeFav={removeFav} setUser={setUser} />
                            </Col>
                        )
                    }/>
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
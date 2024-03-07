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
import{ BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://mikes-movie-flix-5278ac249606.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => ({
                        id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name,
                            Description: movie.Genre.Description
                        },
                        Director: {
                            Name: movie.Director.Name,
                            Bio: movie.Director.Bio
                        },
                        Featured: movie.Featured
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error('Failed to fetch movies', error);
            });
    }, [token]);

    const [isFavorite, setIsFavorite] = useState(
        false
    );

    useEffect(() =>{
        if (user?.FavoriteMovies && user.FavoriteMovies?.includes(movies._id)) {
            setIsFavorite(true);
        }
    }, [user]);

    const addFav =(id) => {
        fetch("https://mikes-movie-flix-5278ac249606.herokuapp.com/users/${user.Username}/movies/${id}", {
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
        }).then((user) =>{
            if(user) {
                alert("Added successfully to favorite movies");
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
            }
        }).catch(error => {
            console.error("Error: ", error);
        });
    };

    const removeFav =(id) => {
        fetch("https://mikes-movie-flix-5278ac249606.herokuapp.com/users/${user.Username}/movies/${id}", {
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
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
            }
        }).catch(error => {
            console.error("Error: ", error);
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
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                     {user ? (
                                        <Navigate to ="/" />
                                    ): (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                {user ? (
                                    <Navigate to ="/" />
                                ): (
                                    <Col md={5}>
                                        <LoginView 
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                                localStorage.setItem("user", JSON.stringify(user));
                                                localStorage.setItem("token", token);
                                            }}
                                            />
                                    </Col>
                                )}
                                </>
                            }
                            />
                            <Route
                                path="/movies/:movieId"
                                element={
                                    <>
                                    {!user ? (
                                        <Navigate to ="/login" replace />
                                    ): movies.length === 0 ? (
                                        <Col>The list is empty!</Col>                           
                                    ): (
                                        <Col md={8}>
                                            <MovieView 
                                            movies={movies} 
                                            addFav={addFav}
                                            removeFav={removeFav}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                            />
                            <Route
                                path="/"
                                element={
                                    <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ): movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ): (
                                        <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard 
                                                movie={movie} 
                                                addFav={addFav}
                                                removeFav={removeFav}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                    path="/profile"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace/>
                        ): (
                            <Col>
                            <ProfileView
                            user={user}
                            token={token}
                            movies={movies}
                            addFav={addFav}
                            removeFav={removeFav}
                            setUser={setUser}
                            />
                            </Col>
                        )}
                        </>
                    }
                    />
                </Routes>    
            </Row>
        </BrowserRouter>
    );
};
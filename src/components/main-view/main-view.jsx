import React from "react";
import { useState, useEffect } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import{ BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        
        fetch("https://mikes-movie-flix-5278ac249606.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
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

        return (
            <BrowserRouter>
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
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                                </>
                            }
                            />
                            <Route
                                path="/movies/:moviesId"
                                element={
                                    <>
                                    {!user ? (
                                        <Navigate to ="/login" replace />
                                    ): movies.length === 0 ? (
                                        <Col>The list is empty!</Col>                           
                                    ): (
                                        <Col md={8}>
                                            <MovieView movie={movies} />
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
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>    
            </Row>
        </BrowserRouter>
    );
};
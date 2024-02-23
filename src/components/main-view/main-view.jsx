import React from "react";
import { useState, useEffect } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");   
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;

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
            <Row className="justify-content-md-center">
                {!user ?(
                    <Col md={5}>
                    <LoginView 
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                         }}  
                    />
                    or
                    <SignupView />
                    </Col>
                ): selectedMovie ?(
                    <Col md={8}>
                     <MovieView 
                    movie={selectedMovie} 
                    onBackClick={() => setSelectedMovie(null)} 
                />  
                </Col>
                ): movies.length === 0 ?(
                    <div>The List is Empty!</div>
                ): (
                    <>
                        {movies.map((movie) => (
                            <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                            }}
                        />
                        </Col>
                     ))}
                </>
            )}
                <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
            </Row>
        );   
    };

    

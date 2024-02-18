import { useState, useEffect } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");   
    const [ user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://mikes-movie-flix-5278ac249606.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}`}
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
            })
    }, [token]);

    if (!user) {
        return (
            <>
          <LoginView 
             onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }}  />
            or
            <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return(
            <>
            <button 
            onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}
            >
                Logout
            </button>
         <MovieView 
             movie={selectedMovie} 
             onBackClick={() => setSelectedMovie(null)} 
             />
             </>
        );
    }

    if (movies.length === 0) {
        return (
            <>
                <button
                onClick={() =>{
                    setUser(null);
                    setToken(null);
                    localStorage();
                }}
                >
                    Logout 
                </button>
        <div>The List is Empty!</div>
          </>
        );
    }

    return (
        <div>
            <button
                onClick={() => {
                setUser(null);
                setToken(null);
                 }}
             >
                Logout
            </button>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};

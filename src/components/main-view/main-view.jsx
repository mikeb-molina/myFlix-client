import { useState, useEffect } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);



const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
    fetch("https://mikes-movie-flix-5278ac249606.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
            return {
                id: movie._id,
                title: movie.Title,
                image: movie.imagePath,
                description: movie.Description,
                genre: {
                    name: movie.Genre.Name,
                    description: movie.Genre.Description
                },
                director: {
                    name: movie.Director.Name,
                    bio: movie.Director.Bio
                },
                featured: movie.Featured

            };
        });
        setMovies(moviesFromApi);
    });
}, []);

if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
}

if (movies.length === 0) {
    return<div>The List is Empty!</div>
}

return (
    <div>
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

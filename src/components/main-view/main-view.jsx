import { useState } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id:1,
            Image: 
                "https://m.media-amazon.com/images/I/51lCHiTOSsL._SY445_SX342_.jpg",
            Title: "Interstellar",
            Description:"A team of scientist and astonauts is sent through a wormhole to another solar sytem to find habitable planets for all of Humanity.",
            Genre: {
                Name: "Thriller",
                Description: "Thriller is an intense genre that leaves the audience on the edge of their seat in anticipation of what will happen next.",
            },
                Director: {
                Name: "Christopher Nolan",
                Bio: "Chistopher Nolan was born July 30, 1970 and soon began making short films with his fathers camera. His movies are often dark and gritty with an emphasis on in depth storytelling."
                },
            },
        {
            id: 2,
            Image: 
                "https://m.media-amazon.com/images/I/61mXwKUaOPL._AC_SY450_.jpg",
            Title: "Django: Unchained",
            Description: "Django is a slave who is freed by a bounty hunter who then teaches Django his trade and helps track down his wife in order to save her from her fate.",
            Genre: {
                Name: "Thriller",
                Description: "Thriller is an intense genre that leaves the audience on the edge of their seat in anticipation of what will happen next.",
            },
                Director: {
                    Name: "Quentin Tarantino",
                Bio: "Quentin Tarantino was born on March 27, 1963 in Knoxville, Tennessee and then moved to Califoria at age four and has immersed himself in movies ever since. The movies he makes are often intense and quite violent with a dark tone and a rough edge to them."
            },
            },
        {
            id: 3,
            Image: 
                "https://m.media-amazon.com/images/I/71y3iJWWjHL._SY445_.jpg",
            Title: "Kingdom of Heaven",
            Description: "A man travels to Jerusalem during the Crusades in the hopes of finding forgiveness for his crimes. While fighting in Jerusalem he ends up meeting his king and his enemy and falling in love.",
            Genre: {
                Name: "Drama",
                Description: "This genre is rich with storytelling and dialog but often lacks the violence and explosions of a thriller or adventure genre.",
            },
             Director: {
                 Name: "Ridley Scott",
                Bio: "Ridely Scott is an English Filmaker who was born on November 30, 1937. He is known best for his science fiction and historical drama films with an excellent foundation on his ability to tell stories."
             }
            }
    ]);


const [selectedMovie, setSelectedMovie] = useState(null);

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

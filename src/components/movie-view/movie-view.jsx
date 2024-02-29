import {useParams} from "react-router";
import{Link} from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({movies}) => {
    const {movieId} =useParams();

    const movie= movies.find((m) => m.id === movieId);

    return(
        <div>
            <div>
                <img src= {movie.ImagePath} alt={movie.Title} />
            </div>
            <div>Title: {movie.Title}</div>
            <div>Description:{movie.Description}</div>
            <div>Genre: {movie.Genre.Name} </div>
            <div>Genre Description:{movie.Genre.Description} </div>
            <div>Director: {movie.Director.Name} </div>
            <div>Director Bio: {movie.Director.Bio}</div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};
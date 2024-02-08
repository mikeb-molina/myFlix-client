export const MovieView = ({movie, onBackClick}) => {
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
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
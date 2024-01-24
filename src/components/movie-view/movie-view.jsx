export const MovieView = ({movie, onBackClick}) => {
    return(
        <div>
            <div>
                <img src={movie.Image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.GenreName}</span>
                <span>{movie.GenreDescription}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.DirectorName}</span>
                <span>{movie.DirectorBio}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}
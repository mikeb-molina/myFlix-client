import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";


export const MovieCard = ({movie, addFav, removeFav, isFavorite}) => {
    return(
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link  to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button> 
                </Link>
                <div>
                    {isFavorite ? (
                        <Button variant="primary" onClick={() => removeFav(movie.id)}>Remove from favorites</Button> 
                        ): (
                        <Button variant="primary" onClick={() => addFav(movie.id)}>Add to favorites</Button>                        
                        )} 
                </div>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
    addFav: PropTypes.func.isRequired,
    removeFav: PropTypes.func.isRequired,
    isFavorite:PropTypes.bool.isRequired,
};
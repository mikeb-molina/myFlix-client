import { MovieCard } from "../movie-card/movie-card";
import{ Row, Col, Button} from "react-bootstrap";

export const FavoriteMovies= ({favMovieList}) => {
    return( 
        <>
            <h2>Favorite Movies</h2>
                <Row className="justify-content-md-center">
                    {favMovieList.map((movie) => (
                        <Col md={4} key={movie._id}>
                            <MovieCard
                                movie={movie}
                            />
                            <Button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</Button>
                        </Col>
                    ))}
             </Row>
        </>
    )
}
// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams(); // movie ID from URL
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [detailsRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        ]);

        setMovie(detailsRes.data);

        const trailer = videosRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <Spinner animation="border" variant="light" className="m-5" />;

  return (
    <Container className="text-white mt-4">
      <h2>{movie?.title}</h2>
      <p>{movie?.overview}</p>

      {trailerKey ? (
        <div className="my-4">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : (
        <p>No trailer available.</p>
      )}
    </Container>
  );
};

export default MovieDetails;

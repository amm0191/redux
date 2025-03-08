"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchGameDetails } from "../services/api"

/**
 * @function GameDetailsPage
 * @description Componente que muestra los detalles de un juego específico.
 * Permite agregar o quitar el juego de favoritos.
 * @returns {JSX.Element} Componente con los detalles del juego.
 */
const GameDetailsPage = () => {
  const [game, setGame] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        setLoading(true)
        setError(null)  // Resetear error
        const gameDetails = await fetchGameDetails(id)

        if (!gameDetails || !gameDetails.name) {
          throw new Error("Game not found.")
        }

        setGame(gameDetails)
        setLoading(false)
      } catch (error) {
        setError(error.message || "An error occurred while fetching the game details.")
        setLoading(false)
      }
    }

    loadGameDetails()
  }, [id])

  const toggleFavorite = () => {
    setIsFavorite((prevFavorite) => !prevFavorite)
    // Aquí se podría actualizar la información en un almacenamiento local o base de datos
    if (!isFavorite) {
      localStorage.setItem(`favoriteGame-${id}`, true)
    } else {
      localStorage.removeItem(`favoriteGame-${id}`)
    }
  }

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>
  }

  if (error) {
    return <div className="container py-5 text-center text-danger">{error}</div>
  }

  if (!game) {
    return <div className="container py-5 text-center">Game not found.</div>
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">{game.name}</h1>
      <img
        src={game.background_image || "/placeholder.svg"}
        alt={game.name}
        className="img-fluid rounded mb-4 shadow"
        style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
      />
      <div className="d-flex justify-content-center mb-4">
        <button
          onClick={toggleFavorite}
          className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h3 mb-3">About</h2>
              <p className="card-text">{game.description_raw || "No description available"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h3 mb-3">Details</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Release Date:</strong> {game.released || "Unknown"}
                </li>
                <li className="list-group-item">
                  <strong>Rating:</strong> {game.rating ? `${game.rating}/5` : "No rating"}
                </li>
                <li className="list-group-item">
                  <strong>Platforms:</strong> {game.platforms ? game.platforms.map((p) => p.platform.name).join(", ") : "Unknown"}
                </li>
                <li className="list-group-item">
                  <strong>Genres:</strong>
                  {game.genres && game.genres.length > 0 ? (
                    game.genres.map((genre) => (
                      <Link key={genre.id} to={`/games/genre/${genre.id}`} className="badge bg-secondary me-1">
                        {genre.name}
                      </Link>
                    ))
                  ) : (
                    "No genres available"
                  )}
                </li>
                <li className="list-group-item">
                  <strong>Tags:</strong>
                  {game.tags && game.tags.length > 0 ? (
                    game.tags.map((tag) => (
                      <Link key={tag.id} to={`/games/tag/${tag.id}`} className="badge bg-info me-1">
                        {tag.name}
                      </Link>
                    ))
                  ) : (
                    "No tags available"
                  )}
                </li>
                <li className="list-group-item">
                  <strong>Publishers:</strong>
                  {game.publishers && game.publishers.length > 0 ? (
                    game.publishers.map((publisher) => (
                      <Link key={publisher.id} to={`/publisher/${publisher.id}`} className="badge bg-primary me-1">
                        {publisher.name}
                      </Link>
                    ))
                  ) : (
                    "No publishers available"
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetailsPage

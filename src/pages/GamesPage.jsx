"use client"

import { useState, useEffect } from "react"
import { fetchGames, searchGames } from "../services/api"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"

const GamesPage = () => {
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true)
      const result = await fetchGames(currentPage)
      setGames(result.results)
      setTotalPages(Math.ceil(result.count / 20))
      setLoading(false)
    }
    loadGames()
  }, [currentPage])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm) {
      setLoading(true)
      const result = await searchGames(searchTerm, 1)
      setGames(result.results)
      setTotalPages(Math.ceil(result.count / 20))
      setCurrentPage(1)
      setLoading(false)
    }
  }

  return (
    <main style={{ backgroundColor: "#E5DAD9" }}>
    <div className="container py-5" style={{ backgroundColor: "#E5DAD9" }}>
      {/* Hero Section with Gradient Background */}
      <section className="text-center mb-5" style={{
        background: "linear-gradient(45deg,rgb(177, 142, 145),rgb(215, 116, 116),rgb(211, 213, 86))",
        borderRadius: "20px",
        padding: "50px 20px",
        color: "#fff"
      }}>
        <h1 className="display-4" style={{ fontWeight: "700", fontSize: "3rem" }}>
          Encuentra tu juego favorito
        </h1>
        <p className="lead">Explora el mundo de los videojuegos.</p>
      </section>

      {/* Search Section with Light Purple Design */}
      <section className="text-center mb-5">
        <form onSubmit={handleSearch} className="mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="input-group gap-3">
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for games..."
              style={{
                borderRadius: "30px",
                padding: "15px",
                fontSize: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease"
              }}
              onFocus={(e) => e.target.style.boxShadow = "0 0 20px rgba(34, 193, 195, 0.5)"}
            />
            <button
              type="submit"
              className="btn"
              style={{
                borderRadius: "30px",
                fontSize: "16px",
                padding: "15px 30px",
                backgroundColor: "rgb(215, 116, 116)",
                border: "none",
                color: "#fff",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgb(215, 116, 116)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "rgb(215, 116, 116)"}
            >
              Buscar
            </button>
          </div>
        </form>
      </section>

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {/* Game Cards */}
          <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {games.map((game) => (
              <div key={game.id} className="col mb-4">
                <div
                  className="card h-100 shadow-lg rounded-lg"
                  style={{
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#E0AD9A",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    borderRadius: "20px"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                  {/* Image with Hover Effect */}
                  <div
                    className="game-image-container"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: "250px",
                      borderRadius: "20px 20px 0 0"
                    }}
                  >
                    <img
                      src={game.background_image || "https://via.placeholder.com/400x250"}
                      alt={game.name}
                      className="card-img-top"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease"
                      }}
                    />
                  </div>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <h5 className="card-title" style={{ fontSize: "1.5rem", color: "#fff" }}>{game.name}</h5>
                    <p className="card-text" style={{ fontSize: "1rem", color: "#BDC3C7" }}>
                      {game.description_raw?.slice(0, 80)}...
                    </p>
                    <a
                      href={`/game/${game.id}`}
                      className="btn btn-outline-light btn-sm"
                      style={{
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "500",
                        borderColor: "#000000",
                        color: "#000000",
                        backgroundColor: "#FFFFFF",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#FFFFFF"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#FFFFFF"}
                    >
                      Detalles
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Pagination Section */}
          <section className="text-center mt-5">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </section>
        </div>
      )}
    </div>
    </main>
  )
}

export default GamesPage

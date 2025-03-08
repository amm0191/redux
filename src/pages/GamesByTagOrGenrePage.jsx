"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchGamesByTagOrGenre } from "../services/api"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"

const GamesByTagOrGenrePage = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { type, id } = useParams()

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true)
      const result = await fetchGamesByTagOrGenre(type, id, currentPage)
      setGames(result.results)
      setTotalPages(Math.ceil(result.count / 20))
      setLoading(false)
    }
    loadGames()
  }, [type, id, currentPage])

  return (
    <main style={{ backgroundColor: "#E5DAD9" }}>
    <div className="container py-5">
      <h1 className="display-4 mb-4">
        Games by {type === "tag" ? "Tag" : "Genre"}
      </h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : games.length > 0 ? (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {games.map((game) => (
              <div key={game.id} className="col">
                <GameCard game={game} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center">Videojuego no encontrado</div>
      )}
    </div>
    </main>
  )
}

export default GamesByTagOrGenrePage

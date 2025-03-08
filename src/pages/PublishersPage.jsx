"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchPublishers, searchPublishers } from "../services/api"
import Pagination from "../components/Pagination"

const PublishersPage = () => {
  const [publishers, setPublishers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadPublishers = async () => {
      const result = await fetchPublishers(currentPage)
      setPublishers(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadPublishers()
  }, [currentPage])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm) {
      const result = await searchPublishers(searchTerm, 1)
      setPublishers(result.results)
      setTotalPages(Math.ceil(result.count / 20))
      setCurrentPage(1)
    }
  }

  return (
    <div className="container py-5">
      {/* Título principal */}
      <h1 className="display-4 mb-4 text-center" style={{ fontWeight: "bold", color: "#ff6f61" }}>
        Explore Publishers
      </h1>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} className="mb-5">
        <div className="input-group shadow-sm rounded-pill">
          <input
            type="text"
            className="form-control border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for publishers..."
            style={{ padding: "15px", fontSize: "1rem", borderRadius: "50px" }}
          />
          <button type="submit" className="btn btn-primary rounded-pill" style={{ padding: "12px 30px", fontSize: "1.1rem" }}>
            Search
          </button>
        </div>
      </form>

      {/* Lista de Publishers */}
      <div className="list-group">
        {publishers.map((publisher) => (
          <Link
            key={publisher.id}
            to={`/publisher/${publisher.id}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              borderRadius: "10px",
              marginBottom: "15px",
              padding: "15px",
              transition: "all 0.3s ease",
            }}
          >
            <span>{publisher.name}</span>
            <span className="badge bg-primary rounded-pill">{publisher.games_count} games</span>
          </Link>
        ))}
      </div>

      {/* Paginación */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default PublishersPage

"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchTags, searchTags } from "../services/api"
import Pagination from "../components/Pagination"

const TagsPage = () => {
  const [tags, setTags] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadTags = async () => {
      const result = await fetchTags(currentPage)
      setTags(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadTags()
  }, [currentPage])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm) {
      const result = await searchTags(searchTerm, 1)
      setTags(result.results)
      setTotalPages(Math.ceil(result.count / 20))
      setCurrentPage(1)
    }
  }

  return (
    <main style={{ backgroundColor: "#E5DAD9" }}>
    <div className="container py-5">
      {/* Título principal */}
      <h1 className="display-4 mb-4 text-center" style={{ fontWeight: "bold", color: "#ff6f61" }}>
        Explorar Etiquetas
      </h1>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} className="mb-5">
        <div className="input-group shadow-sm rounded-pill gap-3">
          <input
            type="text"
            className="form-control border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for tags..."
            style={{ padding: "15px", fontSize: "1rem", borderRadius: "50px" }}
          />
          <button type="submit"  className="btn rounded-pill" style={{ padding: "12px 30px", fontSize: "1.1rem", backgroundColor: "#d77474" }}>
            Buscar
          </button>
        </div>
      </form>

      {/* Tarjetas de etiquetas */}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {tags.map((tag) => (
          <div key={tag.id} className="col">
            <Link to={`/games/tag/${tag.id}`}  className="text-decoration-none">
              <div className="card h-100" style={{ borderRadius: "10px", transition: "all 0.3s ease" }}>
                <div style={{ padding: "12px 30px", fontSize: "1.1rem", backgroundColor: "#d77474" }} className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold", color: "#333" }}>
                    {tag.name}
                  </h5>
                  <p className="card-text text-muted">Games count: {tag.games_count}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
    </main>
  )
}

export default TagsPage

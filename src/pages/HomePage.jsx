"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchPopularGames } from "../services/api"
import GameCarousel from "../components/GameCarousel"

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([])

  useEffect(() => {
    const loadPopularGames = async () => {
      const games = await fetchPopularGames(5)
      setPopularGames(games)
    }
    loadPopularGames()
  }, [])

  return (
    <main style={{ backgroundColor: "#E5DAD9" }}>
    <div className="container py-5">
      {/* Sección Hero con un fondo sofisticado y colores llamativos */}
      <section className="text-center mb-5" style={{
        background: "linear-gradient(45deg,rgb(177, 142, 145),rgb(215, 116, 116),rgb(211, 213, 86))",
        color: "#ffffff",
        padding: "70px 30px",
        borderRadius: "20px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
      }}>
        <h1 className="display-4 mb-3" style={{ fontWeight: "bold" }}>
          Bienvenido a Videojuegos Moya
        </h1>
        <p className="lead mb-4" style={{ fontSize: "1.25rem", color: "#f1f1f1" }}>
          Explora el mundo de los videojuegos.
        </p>
        <Link to="/games" className="btn btn-outline-light btn-lg" style={{
          padding: "15px 30px",
          fontSize: "1.2rem",
          borderRadius: "50px",
          border: "2px solid #fff"
        }}>
          Empieza a explorar
        </Link>
      </section>

      {/* Carrusel de Juegos Populares con un toque moderno */}
      <section className="mb-5">
        <h2 className="h3 text-center mb-4" style={{
          fontWeight: "500", color: "#333", textTransform: "uppercase", letterSpacing: "2px"
        }}>
          Juegos Populares
        </h2>
        {popularGames.length > 0 ? (
          <GameCarousel games={popularGames} />
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{
            minHeight: "300px", background: "#f5f5f5", borderRadius: "10px"
          }}>
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </section>

      {/* Sección de Call to Action con un fondo oscuro y botones llamativos */}
      <section className="text-center py-5" style={{
        backgroundColor: "#333",
        borderRadius: "20px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
      }}>
        <h2 className="h3 mb-3" style={{ color: "#f1f1f1" }}>
          Explora el mundo de los videojuegos
        </h2>
        <p className="lead mb-4" style={{ color: "#bbb" }}>
          Descubre nuevos juegos, aprende sobre tus favoritos y sumérgete en información detallada.
        </p>
        <Link to="/games" className="btn btn-warning btn-lg" style={{
          padding: "15px 30px",
          fontSize: "1.2rem",
          borderRadius: "50px"
        }}>
          Empieza a explorar
        </Link>
      </section>
    </div>
    </main>
  )
}

export default HomePage

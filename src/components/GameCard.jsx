import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <div className="card h-100 shadow-lg border-0" style={{
      borderRadius: "10px", 
      overflow: "hidden", 
      backgroundColor: "#2c2c2c", 
      transition: "transform 0.3s ease-in-out"
    }}>
      <img
        src={game.background_image || "/placeholder.svg"}
        className="card-img-top"
        alt={game.name}
        style={{
          height: "200px", 
          objectFit: "cover", 
          transition: "transform 0.3s ease-in-out"
        }}
      />
      <div className="card-body d-flex flex-column" style={{ padding: "20px" }}>
        <h5 className="card-title" style={{ color: "#f1f1f1", fontWeight: "bold" }}>
          {game.name}
        </h5>
        <p className="card-text mb-4" style={{ color: "#bbb" }}>
          Rating: {game.rating}/5
        </p>
        <Link
          to={`/game/${game.id}`}
          className="btn btn-outline-light mt-auto"
          style={{
            borderRadius: "30px", 
            padding: "12px 24px", 
            fontSize: "1rem",
            transition: "background-color 0.3s ease-in-out"
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GameCard;

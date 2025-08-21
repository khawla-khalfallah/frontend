import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

const FormationCard = ({ formation }) => {
  if (!formation) return null;

  // Fonction pour afficher les étoiles de notation
  const renderStars = (note) => {
    const stars = [];
    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="text-warning">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="text-warning">☆</span>);
      } else {
        stars.push(<span key={i} className="text-secondary">★</span>);
      }
    }

    return stars;
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{formation.titre}</Card.Title>
          <Badge bg="info" className="ms-2">
            {formation.categorie?.nom || "Général"}
          </Badge>
        </div>

        <Card.Subtitle className="mb-2 text-muted">
          Par {formation.formateur?.user?.nom} {formation.formateur?.user?.prenom}
        </Card.Subtitle>

        <Card.Text className="text-truncate-3 mb-3">
          {formation.description || "Aucune description disponible."}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            {formation.moyenne ? (
              <div>
                <div className="mb-1">{renderStars(formation.moyenne)}</div>
                <small className="text-muted">
                  {formation.moyenne.toFixed(1)} ({formation.evaluations?.length || 0} avis)
                </small>
              </div>
            ) : (
              <small className="text-muted">Pas encore évalué</small>
            )}
          </div>

          <div className="text-end">
            <div>
              <small className="text-muted">Durée:</small>{" "}
              <strong>
                {Math.ceil(
                  (new Date(formation.date_fin) - new Date(formation.date_debut)) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                jours
              </strong>
            </div>
            <div>
              <small className="text-muted">Places:</small>{" "}
              <strong>
                {formation.apprenants?.length || 0}/{formation.nombre_places || "∞"}
              </strong>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" size="sm">
            Voir détails
          </Button>
          <div>
            {formation.prix ? (
              <Badge bg="success" className="fs-6">
                {formation.prix} TND
              </Badge>
            ) : (
              <Badge bg="success" className="fs-6">
                Gratuit
              </Badge>
            )}
          </div>
        </div>
      </Card.Body>

      <Card.Footer className="text-muted small">
        <div className="d-flex justify-content-between">
          <span>
            Début: {new Date(formation.date_debut).toLocaleDateString()}
          </span>
          <span>
            Fin: {new Date(formation.date_fin).toLocaleDateString()}
          </span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default FormationCard;
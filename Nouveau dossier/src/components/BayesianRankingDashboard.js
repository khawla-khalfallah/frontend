import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Container,
    Card,
    Spinner,
    Button,
    Form,
    Table,
    ButtonGroup,
    Badge,
    Alert,
    Offcanvas
} from 'react-bootstrap';
import NavbarMinimal from "../components/NavbarMinimal";
import SidebarApprenant from "../components/SidebarApprenant";

const BayesianRankingDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({
        formations: [],
        meta: { m: 10, C: 3.5, global_avg: 3 }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [m, setM] = useState(10);
    const [C, setC] = useState(3.5);
    const [rankingMethod, setRankingMethod] = useState('weighted');
    const [showParams, setShowParams] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:8000/api/formations/ranking/bayesian",
                    {
                        params: { m, C },
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                
                const normalizedData = {
                    formations: response.data.formations || [],
                    meta: {
                        m: Number(response.data.meta?.m) || 10,
                        C: Number(response.data.meta?.C) || 3.5,
                        global_avg: Number(response.data.meta?.global_avg) || 3
                    }
                };
                setData(normalizedData);
            } catch (err) {
                console.error("Erreur API:", err);
                setError("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [m, C]);

    const handleViewDetails = (formationId) => {
        const isApprenantRoute = location.pathname.includes('/apprenant');
        navigate(isApprenantRoute 
            ? `/apprenant/formations/${formationId}`
            : `/formations/${formationId}`
        );
    };

    const handleMChange = (value) => {
        setM(Number(value));
    };

    const handleCChange = (value) => {
        setC(Number(value));
    };

    const sortedFormations = [...data.formations].sort((a, b) => {
        const aValue = rankingMethod === 'average' 
            ? (a.average_rating || 0) 
            : (a.bayesian_score || 0);
        const bValue = rankingMethod === 'average' 
            ? (b.average_rating || 0) 
            : (b.bayesian_score || 0);
        return bValue - aValue;
    });

    const renderStars = (rating) => {
        const numRating = Number(rating) || 0;
        return [...Array(5)].map((_, i) => (
            <span 
                key={i} 
                className={i < numRating ? "text-warning" : "text-secondary"}
            >
                {i < Math.floor(numRating) ? '★' : '☆'}
            </span>
        ));
    };

    const safeToFixed = (value, decimals = 2) => {
        const num = Number(value);
        return isNaN(num) ? 'N/A' : num.toFixed(decimals);
    };

    if (loading) {
        return (
            <div>
                <NavbarMinimal />
                <div className="d-flex">
                    <SidebarApprenant/>
                    <Container className="d-flex justify-content-center align-items-center" 
                         style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                        <Spinner animation="border" variant="primary" />
                    </Container>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <NavbarMinimal />
                <div className="d-flex">
                    <SidebarApprenant/>
                    <Container className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                        <Alert variant="danger" className="text-center">
                            {error}
                            <Button
                                variant="outline-danger"
                                className="ms-3"
                                onClick={() => window.location.reload()}
                            >
                                Réessayer
                            </Button>
                        </Alert>
                    </Container>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavbarMinimal />
            <div className="d-flex">
                <SidebarApprenant/>
                <Container className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                    <Card className="bg-white shadow rounded p-4">
                        <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
                            🏆 Classement des Formations
                        </h2>
                        <p className="mb-4 text-center text-muted">
                            {rankingMethod === 'weighted' 
                                ? "Classement basé sur la méthode bayésienne" 
                                : "Classement basé sur la moyenne simple"}
                        </p>

                        <div className="text-center mb-4">
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowParams(true)}
                                className="px-4"
                            >
                                ⚙️ Paramètres Avancés
                            </Button>
                        </div>

                        <Offcanvas 
                            show={showParams} 
                            onHide={() => setShowParams(false)}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>⚙️ Paramètres Avancés</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Card className="mb-4 border-0 bg-light">
                                    <Card.Body>
                                        <h5 className="mb-3">🔧 Paramètres de Calcul</h5>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <strong>Seuil de confiance (m):</strong> {m}
                                                    <small className="text-muted ms-2">
                                                        {m < 5 ? "(Faible confiance dans la moyenne globale)" :
                                                         m < 10 ? "(Confiance modérée)" : "(Forte confiance)"}
                                                    </small>
                                                </Form.Label>
                                                <Form.Range
                                                    min="1" max="20"
                                                    value={m}
                                                    onChange={(e) => handleMChange(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>
                                                    <strong>Note globale de référence (C):</strong> {safeToFixed(C, 1)}
                                                    <small className="text-muted ms-2">
                                                        (Moyenne globale: {safeToFixed(data.meta.global_avg, 1)})
                                                    </small>
                                                </Form.Label>
                                                <Form.Range
                                                    min="1" max="5" step="0.1"
                                                    value={C}
                                                    onChange={(e) => handleCChange(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Offcanvas.Body>
                        </Offcanvas>

                        <div className="d-flex justify-content-center mb-4">
                            <ButtonGroup>
                                <Button
                                    variant={rankingMethod === 'weighted' ? 'primary' : 'outline-primary'}
                                    onClick={() => setRankingMethod('weighted')}
                                    className="px-4"
                                >
                                    Score Pondéré
                                </Button>
                                <Button
                                    variant={rankingMethod === 'average' ? 'primary' : 'outline-primary'}
                                    onClick={() => setRankingMethod('average')}
                                    className="px-4"
                                >
                                    Moyenne Simple
                                </Button>
                            </ButtonGroup>
                        </div>

                        <Table striped bordered hover responsive>
                            <thead className="table-dark">
                                <tr>
                                    <th width="5%">#</th>
                                    <th width="35%">Formation</th>
                                    <th width="20%" className="text-center">
                                        {rankingMethod === 'weighted' ? 'Score' : 'Moyenne'}
                                    </th>
                                    <th width="15%" className="text-center">Évaluations</th>
                                    <th width="25%" className="text-center">Détails</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedFormations.map((formation, index) => (
                                    <tr key={formation.id}>
                                        <td className="align-middle fw-bold">{index + 1}</td>
                                        <td>
                                            <div className="fw-bold">{formation.titre}</div>
                                            {formation.formateur?.user && (
                                                <div className="text-muted small">
                                                    Par {formation.formateur.user.nom} {formation.formateur.user.prenom}
                                                </div>
                                            )}
                                        </td>
                                        <td className="align-middle text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">
                                                    {renderStars(rankingMethod === 'weighted' ?
                                                        formation.bayesian_score :
                                                        formation.average_rating)}
                                                </div>
                                                <span className="fw-bold fs-5">
                                                    {safeToFixed(rankingMethod === 'weighted' ?
                                                        formation.bayesian_score :
                                                        formation.average_rating)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="align-middle text-center">
                                            <Badge
                                                bg={formation.evaluations_count > 0 ? 'success' : 'secondary'}
                                                className="fs-6"
                                            >
                                                {formation.evaluations_count || 0}
                                            </Badge>
                                        </td>
                                        <td className="align-middle text-center">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => handleViewDetails(formation.id)}
                                            >
                                                Voir
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {sortedFormations.length === 0 && (
                            <Alert variant="info" className="mt-4 text-center">
                                Aucune formation disponible pour le moment.
                            </Alert>
                        )}
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default BayesianRankingDashboard;
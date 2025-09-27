import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Badge, 
  Alert,
  Spinner,
  Tab,
  Tabs
} from 'react-bootstrap';
import { 
  FaCertificate, 
  FaDownload, 
  FaPlus, 
  FaEdit, 
  FaTrash,
  FaTrophy,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaRobot
} from 'react-icons/fa';
import axios from 'axios';
import LayoutFormateur from '../../layouts/FormateurLayout';
import './Certifications.css';

const Certifications = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [formations, setFormations] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [certificats, setCertificats] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal states
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Form states for template creation
  const [templateData, setTemplateData] = useState({
    formation_id: '',
    examen_id: '',
    titre_certification: '',
    score_minimum: '',
    description: '',
    is_active: true
  });

  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadTemplates(),
        loadFormations(),
        loadCertificats(),
        loadStats()
      ]);
    } catch (error) {
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      const response = await api.get('/formateur/certifications/templates');
      setTemplates(response.data);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const loadFormations = async () => {
    try {
      const response = await api.get('/formateur/certifications/formations');
      setFormations(response.data);
    } catch (error) {
      console.error('Error loading formations:', error);
    }
  };

  const loadCertificats = async () => {
    try {
      const response = await api.get('/formateur/certifications/certificates');
      setCertificats(response.data);
    } catch (error) {
      console.error('Error loading certificats:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await api.get('/formateur/certifications/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/formateur/certifications/templates', templateData);
      setSuccess('Template de certification créé avec succès');
      setShowTemplateModal(false);
      resetTemplateForm();
      loadTemplates();
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur lors de la création du template');
      console.error('Error creating template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCertificate = async (id) => {
    try {
      const response = await api.get(`/formateur/certifications/certificates/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificat_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      setError('Erreur lors du téléchargement du certificat');
      console.error('Error downloading certificate:', error);
    }
  };

  const resetTemplateForm = () => {
    setTemplateData({
      formation_id: '',
      examen_id: '',
      titre_certification: '',
      score_minimum: '',
      description: '',
      is_active: true
    });
  };

  const openTemplateModal = (formation = null) => {
    resetTemplateForm();
    if (formation) {
      setTemplateData(prev => ({ 
        ...prev, 
        formation_id: formation.id,
        titre_certification: `Certificat de réussite - ${formation.titre}`
      }));
    }
    setShowTemplateModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'réussi':
        return <Badge bg="success">Réussi</Badge>;
      case 'échoué':
        return <Badge bg="danger">Échoué</Badge>;
      default:
        return <Badge bg="warning">En attente</Badge>;
    }
  };

  const renderOverview = () => (
    <div>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="certification-stats-card">
            <Card.Body className="text-center">
              <FaCog size={40} className="text-primary mb-3" />
              <h3>{stats.active_templates || 0}</h3>
              <p className="text-muted">Templates actifs</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="certification-stats-card">
            <Card.Body className="text-center">
              <FaCertificate size={40} className="text-success mb-3" />
              <h3>{stats.total_certificates || 0}</h3>
              <p className="text-muted">Certificats générés</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="certification-stats-card">
            <Card.Body className="text-center">
              <FaRobot size={40} className="text-warning mb-3" />
              <h3>{stats.certificates_this_month || 0}</h3>
              <p className="text-muted">Ce mois-ci</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="certification-stats-card">
            <Card.Body className="text-center">
              <FaClipboardList size={40} className="text-info mb-3" />
              <h3>{formations.length}</h3>
              <p className="text-muted">Formations</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card>
        <Card.Header>
          <h5><FaRobot className="me-2" />Comment ça marche</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <div className="text-center mb-3">
                <FaCog size={50} className="text-primary mb-2" />
                <h6>1. Créer un Template</h6>
                <p className="small text-muted">
                  Définissez les critères de certification pour chaque formation (note minimum requise)
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center mb-3">
                <FaUsers size={50} className="text-success mb-2" />
                <h6>2. Les étudiants passent l'examen</h6>
                <p className="small text-muted">
                  Quand un étudiant réussit l'examen avec la note requise
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center mb-3">
                <FaCertificate size={50} className="text-warning mb-2" />
                <h6>3. Certification automatique</h6>
                <p className="small text-muted">
                  Le certificat PDF est généré et envoyé automatiquement
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );

  const renderTemplates = () => (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5><FaCog className="me-2" />Templates de Certification</h5>
        <Button variant="success" onClick={() => openTemplateModal()}>
          <FaPlus /> Nouveau Template
        </Button>
      </Card.Header>
      <Card.Body>
        {templates.length === 0 ? (
          <Alert variant="info">
            Aucun template de certification configuré. Créez un template pour permettre la génération automatique de certificats.
          </Alert>
        ) : (
          <Table striped hover>
            <thead>
              <tr>
                <th>Formation</th>
                <th>Examen</th>
                <th>Titre Certificat</th>
                <th>Note Min.</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map(template => (
                <tr key={template.id}>
                  <td>{template.formation?.titre}</td>
                  <td>{template.examen?.title || 'Tous les examens'}</td>
                  <td>{template.titre_certification}</td>
                  <td>{template.score_minimum}/20</td>
                  <td>
                    <Badge bg={template.is_active ? 'success' : 'secondary'}>
                      {template.is_active ? 'Actif' : 'Inactif'}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="warning" size="sm" className="me-1">
                      <FaEdit />
                    </Button>
                    <Button variant="danger" size="sm">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );

  const renderFormations = () => (
    <Card>
      <Card.Header>
        <h5><FaClipboardList className="me-2" />Mes Formations</h5>
      </Card.Header>
      <Card.Body>
        {formations.map(formation => (
          <Card key={formation.id} className="mb-3">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h6>{formation.titre}</h6>
                  <p className="text-muted small">{formation.description}</p>
                  <Badge bg="info" className="me-2">{formation.inscrits?.length || 0} inscrits</Badge>
                  <Badge bg="secondary">{formation.duree}h</Badge>
                  <Badge bg="warning" className="ms-2">{formation.certificats?.length || 0} certificats</Badge>
                </Col>
                <Col md={4} className="text-end">
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={() => openTemplateModal(formation)}
                  >
                    <FaPlus /> Créer Template
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );

  const renderCertificats = () => (
    <Card>
      <Card.Header>
        <h5><FaCertificate className="me-2" />Certificats Générés Automatiquement</h5>
      </Card.Header>
      <Card.Body>
        {certificats.length === 0 ? (
          <Alert variant="info">
            <FaRobot className="me-2" />
            Aucun certificat généré automatiquement pour le moment. 
            Les certificats apparaîtront ici quand les étudiants réussiront leurs examens avec la note requise.
          </Alert>
        ) : (
          <Table striped hover>
            <thead>
              <tr>
                <th>Étudiant</th>
                <th>Formation</th>
                <th>Titre</th>
                <th>Note</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificats.map(cert => (
                <tr key={cert.id}>
                  <td>{cert.apprenant?.user?.prenom} {cert.apprenant?.user?.nom}</td>
                  <td>{cert.formation?.titre}</td>
                  <td>{cert.titre_certification}</td>
                  <td>
                    <Badge bg="success">{cert.note_examen}/20</Badge>
                  </td>
                  <td>{new Date(cert.date_obtention).toLocaleDateString()}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="me-1"
                      onClick={() => handleDownloadCertificate(cert.id)}
                      disabled={!cert.pdf_path}
                    >
                      <FaDownload /> Télécharger
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <LayoutFormateur>
      <Container fluid className="certifications-page">
        <Row className="mb-4">
          <Col>
            <h2><FaCertificate className="me-2" />Gestion des Certifications</h2>
            <p className="text-muted">Gérez les certificats de vos formations</p>
          </Col>
        </Row>

        {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
        {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

        <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
          <Tab eventKey="overview" title="Vue d'ensemble">
            {renderOverview()}
          </Tab>
          <Tab eventKey="templates" title="Templates">
            {renderTemplates()}
          </Tab>
          <Tab eventKey="formations" title="Formations">
            {renderFormations()}
          </Tab>
          <Tab eventKey="certificats" title="Certificats Générés">
            {renderCertificats()}
          </Tab>
        </Tabs>

      {/* Create Template Modal */}
      <Modal show={showTemplateModal} onHide={() => setShowTemplateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Créer un Template de Certification</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateTemplate}>
          <Modal.Body>
            <Alert variant="info">
              <FaRobot className="me-2" />
              Les certificats seront générés <strong>automatiquement</strong> lorsque les étudiants atteignent la note minimum requise.
            </Alert>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Formation *</Form.Label>
                  <Form.Select 
                    value={templateData.formation_id}
                    onChange={(e) => setTemplateData({...templateData, formation_id: e.target.value})}
                    required
                  >
                    <option value="">Sélectionner une formation</option>
                    {formations.map(formation => (
                      <option key={formation.id} value={formation.id}>
                        {formation.titre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Examen (optionnel)</Form.Label>
                  <Form.Select 
                    value={templateData.examen_id}
                    onChange={(e) => setTemplateData({...templateData, examen_id: e.target.value})}
                  >
                    <option value="">Tous les examens de la formation</option>
                    {/* We would need to load exams for selected formation */}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Laissez vide pour appliquer à tous les examens de la formation
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Titre du Certificat *</Form.Label>
              <Form.Control 
                type="text"
                value={templateData.titre_certification}
                onChange={(e) => setTemplateData({...templateData, titre_certification: e.target.value})}
                placeholder="Ex: Certificat de réussite - Formation React"
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Note Minimum Requise * (sur 20)</Form.Label>
                  <Form.Control 
                    type="number"
                    step="0.01"
                    min="0"
                    max="20"
                    value={templateData.score_minimum}
                    onChange={(e) => setTemplateData({...templateData, score_minimum: e.target.value})}
                    placeholder="Ex: 10"
                    required
                  />
                  <Form.Text className="text-muted">
                    Les étudiants qui obtiennent cette note ou plus recevront automatiquement le certificat
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Statut</Form.Label>
                  <Form.Check 
                    type="switch"
                    id="template-active-switch"
                    label="Template actif"
                    checked={templateData.is_active}
                    onChange={(e) => setTemplateData({...templateData, is_active: e.target.checked})}
                  />
                  <Form.Text className="text-muted">
                    Seuls les templates actifs génèrent des certificats
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description (optionnel)</Form.Label>
              <Form.Control 
                as="textarea"
                rows={3}
                value={templateData.description}
                onChange={(e) => setTemplateData({...templateData, description: e.target.value})}
                placeholder="Description du certificat ou critères additionnels..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTemplateModal(false)}>
              Annuler
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : 'Créer le Template'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      </Container>
    </LayoutFormateur>
  );
};

export default Certifications;
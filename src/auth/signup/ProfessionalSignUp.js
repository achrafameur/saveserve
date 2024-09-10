import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  Link,
  Dialog,
  DialogContent,
  DialogActions,
  Autocomplete,
  Checkbox,
  DialogTitle,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoPopup from "../../components/infoPopUp";


const ProfessionalSignUp = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [cityOptions, setCityOptions] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse_mail: "",
    num_siret: "",
    nom_organisme: "",
    password: "",
    id_service: 2,
    localisation: "",
  });


  const [openInfoPopup, setInfoOpenPopup] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState(false);

  const handleOpenInfoPopUp = () => {
    setInfoOpenPopup(true);
  };

  const handleCloseInfoPopUp = () => {
    setInfoOpenPopup(false);
  };



  const fetchCities = async (query) => {
    try {
      const response = await axios.get(
        `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom&format=json&geometry=centre`
      );
      const cities = response.data.map((city) => ({
        value: city.nom,
        label: city.nom,
      }));
      setCityOptions(cities);
    } catch (error) {
      console.error("Erreur lors du chargement des villes :", error);
    }
  };

  const handleCitySearch = (event) => {
    const query = event.target.value;
    if (query && query.length > 2) {
      // Vérification que query est défini et a une longueur supérieure à 2
      fetchCities(query);
    } else {
      setCityOptions([]); // Réinitialiser les options si l'utilisateur supprime tout ou si query est indéfini
    }
  };

  const handleCitySelectChange = (event, value) => {
    setFormData({
      ...formData,
      localisation: value ? value.value : "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checked) {

      setPopUpMsg("Veuillez accepter les conditions générales et la politique de confidentialité.");
      setInfoOpenPopup(true);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/inscription/`,
        formData
      );
      setOpen(true);
    } catch (error) {
      console.error(error);

      setPopUpMsg("Erreur lors de l'inscription.");
      setInfoOpenPopup(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  const [openTerms, setOpenTerms] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleDialogOpen = () => {
    setOpenTerms(true);
  };

  const handleDialogClose = () => {
    setOpenTerms(false);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "115vh",
        marginTop: -100,
        display: "flex",
        alignItems: "center",
      }}
      className="loginStyling"
    >
      <InfoPopup
        open={openInfoPopup}
        handleClose={handleCloseInfoPopUp}
        message={popUpMsg}
      />
      <Container component="main" maxWidth="sm" sx={{ mt: "5%" }}>
        <Card
          elevation={16}
          sx={{ p: 4 }}
          style={{
            borderRadius: 15,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <RouterLink to="/">
              <img
                src="https://res.cloudinary.com/dubrka8it/image/upload/v1725750135/logoBlack_rjfrix.png"
                alt="Logo"
                style={{ height: 80, width: 80 }}
              />
            </RouterLink>
            <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
              Inscrivez-vous en tant que professionnel
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Nom"
              name="nom"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Prénom"
              name="prenom"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Adresse e-mail"
              name="adresse_mail"
              onChange={handleChange}
              type="email"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Numéro SIRET"
              name="num_siret"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Nom de l'organisme"
              name="nom_organisme"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mot de passe"
              name="password"
              onChange={handleChange}
              type="password"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Ville"
              name="localisation"
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                required
                name="accept_terms"
              />
              <Typography variant="body2">
                J'accepte les{" "}
                <Link onClick={handleDialogOpen} style={{ cursor: "pointer" }}>
                  Conditions générales et Politique de confidentialité
                </Link>
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                background:
                  "linear-gradient(45deg,#23a6d5, rgba(3, 162, 194, 1) 100%)",
                borderRadius: 10,
              }}
            >
              S'inscrire
            </Button>
            <Button component={RouterLink} to="/signup" fullWidth sx={{ mt: 1 }}>
              Retour
            </Button>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Déjà un compte ?{" "}
                <Link component={RouterLink} to="/login">
                  Se connecter
                </Link>
              </Typography>
            </Box>
          </Box>

        </Card>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CheckCircleIcon
              color="success"
              sx={{ fontSize: 60, marginRight: 2 }}
            />
            <Typography variant="h6">
              Inscription réussie ! Vous pouvez maintenant vous connecter avec
              votre nouveau compte.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openTerms} onClose={handleDialogClose}>
          <DialogTitle>
            Conditions générales et Politique de confidentialité
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              <strong>Conditions Générales d'Utilisation (CGU)</strong>
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>1. Introduction</strong>
              <br />
              Les présentes Conditions Générales d'Utilisation (CGU) régissent
              l'utilisation de l'application web Save and Serve. En accédant et
              en utilisant l'Application, vous acceptez les conditions énoncées
              ci-dessous. Si vous n'acceptez pas ces conditions, veuillez ne pas
              utiliser l'application.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>2. Objet de l'Application</strong>
              <br />
              Save and Serve a pour objectif de réduire le gaspillage
              alimentaire en offrant une plateforme en ligne permettant aux
              établissements alimentaires (restaurants, snacks) de vendre leurs
              invendus à prix réduits, et aux consommateurs d'acheter ces
              produits à moindre coût. L'Application vise à promouvoir une
              consommation responsable et économique tout en ayant un impact
              positif sur l'environnement.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>3. Accès et Inscription</strong>
              <br />
              <strong>Accès :</strong> L'accès à l'Application est conditionné à
              la création d'un compte utilisateur. Vous pouvez vous inscrire en
              tant que consommateur ou établissement alimentaire.
              <br />
              <strong>Inscription :</strong> Lors de l'inscription, vous devez
              fournir des informations exactes et complètes. Vous êtes
              responsable de la confidentialité de vos identifiants de connexion
              et de toutes les activités effectuées sous votre compte. Vous
              devez également vous assurer que toutes les informations que vous
              fournissez sont à jour.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>4. Utilisation de l'Application</strong>
              <br />
              <strong>Pour les Établissements Alimentaires :</strong>
              <br />
              <strong>Services Offerts :</strong> Vous pouvez mettre en vente
              vos invendus alimentaires à prix réduits, proposer des produits
              frais de qualité, et offrir des réservations de tables. Vous devez
              garantir la qualité et la sécurité des produits proposés.
              <br />
              <strong>Responsabilités :</strong>
              <br />
              <strong>Informations sur les Produits :</strong> Vous devez
              photographier les produits, fournir des descriptions détaillées et
              fixer des prix attractifs.
              <br />
              <strong>Mise à Jour des Menus :</strong> Vous devez maintenir vos
              menus à jour en temps réel, y compris la disponibilité des
              produits et les informations concernant les paniers mystères.
              <br />
              <strong>Conformité :</strong> Vous devez respecter les lois
              locales et les normes de sécurité alimentaire en vigueur.
              <br />
              <strong>Pour les Consommateurs :</strong>
              <br />
              <strong>Services Offerts :</strong> Vous pouvez consulter les
              offres disponibles, acheter des produits à prix réduits, et
              soutenir les établissements participants.
              <br />
              <strong>Responsabilités :</strong> Vous devez vérifier
              régulièrement les offres disponibles et choisir les produits en
              fonction de leur qualité et de vos préférences.
              <br />
              <strong>Vérification de la Qualité :</strong> Vous êtes
              responsable de vérifier la qualité des produits avant
              consommation.
              <br />
              <strong>Engagement :</strong> Votre fidélité et engagement envers
              les établissements participants sont essentiels pour le succès du
              projet.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>5. Propriété Intellectuelle</strong>
              <br />
              Tous les contenus, marques, logos, logiciels et autres éléments
              présents dans l'application sont la propriété de Save and Serve et
              sont protégés par les lois sur la propriété intellectuelle. Toute
              reproduction, distribution ou modification de ces éléments sans
              autorisation préalable est interdite.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>6. Confidentialité</strong>
              <br />
              Les informations personnelles collectées par l'Application sont
              traitées conformément à notre Politique de Confidentialité. En
              utilisant l'Application, vous consentez à la collecte, à
              l'utilisation et au traitement de vos informations personnelles
              comme décrit dans cette politique.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>
                7. Responsabilités et Limitation de Responsabilité
              </strong>
              <br />
              <strong>Responsabilité de l'Utilisateur :</strong> Vous êtes
              responsable de l'utilisation que vous faites de l'Application, de
              la sécurité de vos informations de connexion, et de toutes les
              activités réalisées sous votre compte.
              <br />
              <strong>Responsabilité de Save and Serve :</strong> Save and Serve
              décline toute responsabilité en cas de dommages directs ou
              indirects résultant de l'utilisation de l'Application, y compris
              mais sans s'y limiter, les pertes de données, les interruptions de
              service ou les erreurs. L'Application est fournie "en l'état" et
              "selon disponibilité".
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>8. Modifications des CGU</strong>
              <br />
              Nous nous réservons le droit de modifier les présentes CGU à tout
              moment. Les modifications seront publiées sur notre site Web ou
              dans l'Application et prendront effet dès leur publication. Il est
              de votre responsabilité de consulter régulièrement les CGU pour
              prendre connaissance d'éventuelles modifications.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>9. Résiliation</strong>
              <br />
              Nous nous réservons le droit de résilier ou de suspendre votre
              accès à l'Application à tout moment, sans préavis, en cas de
              violation des présentes CGU ou pour toute autre raison jugée
              nécessaire. En cas de résiliation, toutes les dispositions des CGU
              qui, par leur nature, devraient survivre à la résiliation,
              resteront en vigueur.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>10. Loi Applicable et Juridiction</strong>
              <br />
              Les présentes CGU sont régies par les lois en vigueur en France.
              Tout litige relatif à l'utilisation de l'Application sera soumis à
              la compétence exclusive des tribunaux de la France.
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>11. Contact</strong>
              <br />
              Pour toute question ou demande concernant les présentes CGU,
              veuillez nous contacter à [adresse e-mail ou autre moyen de
              contact].
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>12. Dispositions Générales</strong>
              <br />
              <strong>Intégralité de l'Accord :</strong> Les présentes CGU
              constituent l'intégralité de l'accord entre vous et Save and Serve
              concernant l'utilisation de l'Application et remplacent toutes les
              communications et propositions antérieures ou contemporaines,
              qu'elles soient électroniques, verbales ou écrites, entre vous et
              Save and Serve.
              <br />
              <strong>Divisibilité :</strong> Si une disposition des présentes
              CGU est jugée invalide ou inapplicable par un tribunal compétent,
              les autres dispositions resteront pleinement en vigueur.
              <br />
              <strong>Renonciation :</strong> Le fait pour Save and Serve de ne
              pas exercer un droit ou une disposition des présentes CGU ne
              constitue pas une renonciation à ce droit ou à cette disposition.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ProfessionalSignUp;

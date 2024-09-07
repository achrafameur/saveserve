import React, { useState } from "react";
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
  Checkbox,
  DialogTitle
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ClientSignUp = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse_mail: "",
    password: "",
    id_service: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checked) {
      alert("Veuillez accepter les conditions générales et la politique de confidentialité.");
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
      alert("Erreur lors de l'inscription.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/login');
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
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Typography component="h1" variant="h5">
    //       Inscription Client
    //     </Typography>
    //     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
    //       <TextField
    //         margin="normal"
    //         fullWidth
    //         label="Nom"
    //         name="nom"
    //         onChange={handleChange}
    //       />
    //       <TextField
    //         margin="normal"
    //         fullWidth
    //         label="Prénom"
    //         name="prenom"
    //         onChange={handleChange}
    //       />
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         label="Adresse e-mail"
    //         name="adresse_mail"
    //         onChange={handleChange}
    //         type="email"
    //       />
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         label="Mot de passe"
    //         name="password"
    //         onChange={handleChange}
    //         type="password"
    //       />
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         S'inscrire
    //       </Button>
    //       <Button
    //         component={Link}
    //         to="/signup"
    //         fullWidth
    //         sx={{ mt: 1 }}
    //       >
    //         Retour
    //       </Button>
    //       <Typography sx={{ mt: 2 }}>
    //         Déjà un compte ? <Link to="/login">Se connecter</Link>
    //       </Typography>
    //     </Box>
    //   </Box>
    // </Container>
    <div
      style={{ backgroundColor: 'black', height: '110vh', marginTop: -100, display: 'flex', alignItems: 'center' }}
      className="loginStyling">
      <Container component="main" maxWidth="sm" sx={{ mt: "5%" }}>
        <Card elevation={16} sx={{ p: 4 }}
          style={{

            borderRadius: 15
          }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}

          >
            <RouterLink to="/">
              <img src="https://res.cloudinary.com/dubrka8it/image/upload/v1725750135/logoBlack_rjfrix.png" alt="Logo" style={{ height: 80, width: 80 }} />
            </RouterLink>
            <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
              Inscrivez-vous en tant que client
            </Typography>
          </Box>
          {/* <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Inscription Client
          </Typography>
        </Box> */}
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
              required
              fullWidth
              label="Mot de passe"
              name="password"
              onChange={handleChange}
              type="password"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                required
                name="accept_terms"
              />
              <Typography variant="body2">
                J'accepte les{" "}
                <Link onClick={handleDialogOpen} style={{ cursor: 'pointer' }}>
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
                background: 'linear-gradient(45deg,#23a6d5, rgba(3, 162, 194, 1) 100%)',
                borderRadius: 10
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
          <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, marginRight: 2 }} />
            <Typography variant="h6">
              Inscription réussie ! Vous pouvez maintenant vous connecter avec votre nouveau compte.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">OK</Button>
          </DialogActions>
        </Dialog>


        <Dialog open={openTerms} onClose={handleDialogClose}>
          <DialogTitle>Conditions générales et Politique de confidentialité</DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              Conditions Générales d'Utilisation (CGU)
              1. Introduction
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de l'application web Save and Serve. En accédant et en utilisant l'Application, vous acceptez les conditions énoncées ci-dessous. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
              2. Objet de l'Application
              Save and Serve a pour objectif de réduire le gaspillage alimentaire en offrant une plateforme en ligne permettant aux établissements alimentaires (restaurants, snacks) de vendre leurs invendus à prix réduits, et aux consommateurs d'acheter ces produits à moindre coût. L'Application vise à promouvoir une consommation responsable et économique tout en ayant un impact positif sur l'environnement.
              3. Accès et Inscription
              Accès : L'accès à l'Application est conditionné à la création d'un compte utilisateur. Vous pouvez vous inscrire en tant que consommateur ou établissement alimentaire.
              Inscription : Lors de l'inscription, vous devez fournir des informations exactes et complètes. Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités effectuées sous votre compte. Vous devez également vous assurer que toutes les informations que vous fournissez sont à jour.
              4. Utilisation de l'Application
              Pour les Établissements Alimentaires :
              Services Offerts : Vous pouvez mettre en vente vos invendus alimentaires à prix réduits, proposer des produits frais de qualité, et offrir des réservations de tables. Vous devez garantir la qualité et la sécurité des produits proposés.
              Responsabilités :
              Informations sur les Produits : Vous devez photographier les produits, fournir des descriptions détaillées et fixer des prix attractifs.
              Mise à Jour des Menus : Vous devez maintenir vos menus à jour en temps réel, y compris la disponibilité des produits et les informations concernant les paniers mystères.
              Conformité : Vous devez respecter les lois locales et les normes de sécurité alimentaire en vigueur.
              Pour les Consommateurs :
              Services Offerts : Vous pouvez consulter les offres disponibles, acheter des produits à prix réduits, et soutenir les établissements participants.
              Responsabilités :
              Consultation des Offres : Vous devez vérifier régulièrement les offres disponibles et choisir les produits en fonction de leur qualité et de vos préférences.
              Vérification de la Qualité : Vous êtes responsable de vérifier la qualité des produits avant consommation.
              Engagement : Votre fidélité et engagement envers les établissements participants sont essentiels pour le succès du projet.
              5. Propriété Intellectuelle
              Tous les contenus, marques, logos, logiciels et autres éléments présents dans l'application sont la propriété de Save and Serve et sont protégés par les lois sur la propriété intellectuelle. Toute reproduction, distribution ou modification de ces éléments sans autorisation préalable est interdite.
              6. Confidentialité
              Les informations personnelles collectées par l'Application sont traitées conformément à notre Politique de Confidentialité. En utilisant l'Application, vous consentez à la collecte, à l'utilisation et au traitement de vos informations personnelles comme décrit dans cette politique.
              7. Responsabilités et Limitation de Responsabilité
              Responsabilité de l'Utilisateur : Vous êtes responsable de l'utilisation que vous faites de l'Application, de la sécurité de vos informations de connexion, et de toutes les activités réalisées sous votre compte.
              Responsabilité de [Nom de l’Organisation ou de la Personne] : Save and Serve décline toute responsabilité en cas de dommages directs ou indirects résultant de l'utilisation de l'Application, y compris mais sans s'y limiter, les pertes de données, les interruptions de service ou les erreurs. L'Application est fournie "en l'état" et "selon disponibilité".
              8. Modifications des CGU
              Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les modifications seront publiées sur notre site Web ou dans l'Application et prendront effet dès leur publication. Il est de votre responsabilité de consulter régulièrement les CGU pour prendre connaissance d'éventuelles modifications.
              9. Résiliation
              Nous nous réservons le droit de résilier ou de suspendre votre accès à l'Application à tout moment, sans préavis, en cas de violation des présentes CGU ou pour toute autre raison jugée nécessaire. En cas de résiliation, toutes les dispositions des CGU qui, par leur nature, devraient survivre à la résiliation, resteront en vigueur.
              10. Loi Applicable et Juridiction
              Les présentes CGU sont régies par les lois en vigueur en France. Tout litige relatif à l'utilisation de l'Application sera soumis à la compétence exclusive des tribunaux de la France
              11. Contact
              Pour toute question ou demande concernant les présentes CGU, veuillez nous contacter à [adresse e-mail ou autre moyen de contact].
              12. Dispositions Générales
              Intégralité de l'Accord : Les présentes CGU constituent l'intégralité de l'accord entre vous et Save and Serve concernant l'utilisation de l'Application et remplacent toutes les communications et propositions antérieures ou contemporaines, qu'elles soient électroniques, verbales ou écrites, entre vous et Save and Serve.
              Divisibilité : Si une disposition des présentes CGU est jugée invalide ou inapplicable par un tribunal compétent, les autres dispositions resteront pleinement en vigueur.
              Renonciation : Le fait pour [Nom de l’Organisation ou de la Personne] de ne pas exercer un droit ou une disposition des présentes CGU ne constitue pas une renonciation à ce droit ou à cette disposition.
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

export default ClientSignUp;

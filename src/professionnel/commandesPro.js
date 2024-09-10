// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Typography,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import altImage from "../../src/imgs/food.png";
// import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
// import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
// import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
// import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";

// const CommandesPro = () => {
//   const [menus, setMenus] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [reload, setReload] = useState(false);
//   const userId = localStorage.getItem("id");

//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/professionnel/commandes/${userId}/`
//         );
//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMenus();
//   }, [userId, reload]);

//   return (
//     <>
//       <Container>
//         <div
//           className="pageTitleHeader"
//           style={{
//             marginTop: 15,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           Listes des commandes
//           <div>{orders.length}</div>
//         </div>

//         <Box
//           sx={{ display: "flex", flexWrap: "wrap", gap: "25px", marginTop: 0 }}
//         >
//           {orders.length > 0 ? (
//             orders.map((order, index) => (
//               <Card
//                 key={order.id}
//                 sx={{ flexBasis: "100%", minWidth: 300 }}
//                 style={{
//                   borderRadius: 10,
//                   boxShadow:
//                     "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     {order.commande_reference}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Date Commande : {order.date_commande}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Total Commande : {order.total_commande} €
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Client :{order.prenom_client} {order.nom_client}
//                   </Typography>
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
//                     {order.menus.map((menu, index) => (
//                       <Card
//                         key={menu.id}
//                         sx={{ flexBasis: "30%", minWidth: 300 }}
//                         style={{
//                           borderRadius: 10,
//                           boxShadow:
//                             "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
//                         }}
//                       >
//                         <CardContent>
//                           <Typography variant="h5" component="div">
//                             {menu.menu_nom}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Quantite : {menu.quantite}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Prix unitaire : {menu.prix_unitaire} €
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Prix Total : {menu.total} €
//                           </Typography>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Typography variant="h6" color="text.secondary" align="center">
//               Il n'y a aucune commande passée pour le moment.
//             </Typography>
//           )}
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default CommandesPro;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import altImage from "../../src/imgs/food.png";
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
const CommandesPro = () => {
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isDeclined,setIsDeclined] = useState(false);
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/profile/`,
          { admin_id: userId }
        );
        setIsVerified(response.data.is_verified);
        setIsDeclined(response.data.is_declined);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/professionnel/commandes/${userId}/`
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
    fetchOrders();
  }, [userId, reload]);


  if (loading) {
    return null; 
  }
  if ((!isVerified && !isDeclined)) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 15px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
            maxWidth: "700px",
            width: "100%",
            position: "relative",
            marginLeft: "20%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "4rem",
              color: "orange",
            }}
          >
            ⏳
          </Box>
          <Typography
            variant="h4"
            color="text.primary"
            fontWeight="bold"
            mt={4}
          >
            Veuillez patienter
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            Votre compte est en cours de vérification par les administrateurs.
            Veuillez patienter, cela ne devrait pas tarder.
          </Typography>
        </Box>
      </Box>
    );
  }

  if (isDeclined) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 15px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
            maxWidth: "700px",
            width: "100%",
            position: "relative",
            marginLeft: "20%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "4rem",
              color: "red",
            }}
          >
            < ReportProblemRoundedIcon style={{ fontSize: 80 }}/>
          </Box>
          <Typography
            variant="h4"
            color="text.primary"
            fontWeight="bold"
            mt={4}
          >
            Veuillez patienter
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            Votre compte a été refusé par les modérateurs de l'application.
            Pour envoyer une demande d'opposition à cette décision, veuillez nous contacter via notre email de contact : contact.saveserve@gmail.com
            Une réponse va vous être délivrée sous 5 jours.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Container>
      <div
        className="pageTitleHeader"
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Listes des commandes
        <div
          style={{ fontSize: 32 }}>Nombre total des commandes : {orders.length}</div>
      </div>

      <Box
        sx={{ display: "flex", flexWrap: "wrap", gap: "25px", marginTop: 0 }}
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card
              key={order.id}
              sx={{ flexBasis: "100%", minWidth: 300 }}
              style={{
                borderRadius: 10,
                boxShadow:
                  "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  N°/ de référence : {order.commande_reference}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date Commande : {order.date_commande}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Commande : {order.total_commande} €
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Client : {order.prenom_client} {order.nom_client}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
                  {order.menus.map((menu) => (
                    <Card
                      key={menu.id}
                      sx={{ flexBasis: "30%", minWidth: 300 }}
                      style={{
                        borderRadius: 10,
                        boxShadow:
                          "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {menu.menu_nom}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantité : {menu.quantite}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Prix unitaire : {menu.prix_unitaire} €
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Prix Total : {menu.total} €
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" align="center">
            Il n'y a aucune commande passée pour le moment.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CommandesPro;

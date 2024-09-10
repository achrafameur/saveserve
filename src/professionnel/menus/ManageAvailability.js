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
// import altImage from "../../../src/imgs/food.png";

// const ManageAvailability = () => {
//   const [menus, setMenus] = useState([]);
//   const userId = localStorage.getItem("id");

//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/superadmin/admin/${userId}/menus/`
//         );
//         setMenus(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMenus();
//   }, [userId]);

//   const handleIncrement = async (id) => {
//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/update/${id}/`,
//         {
//           number_dispo:
//             (menus.find((menu) => menu.id === id).number_dispo || 0) + 1,
//         }
//       );
//       setMenus((prevMenus) => {
//         return prevMenus.map((menu) => {
//           if (menu.id === id) {
//             return { ...menu, number_dispo: response.data.number_dispo };
//           }
//           return menu;
//         });
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDecrement = async (id) => {
//     const currentNumberDispo =
//       menus.find((menu) => menu.id === id).number_dispo || 0;
//     if (currentNumberDispo > 0) {
//       try {
//         const response = await axios.put(
//           `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/update/${id}/`,
//           {
//             number_dispo: currentNumberDispo - 1,
//           }
//         );
//         setMenus((prevMenus) => {
//           return prevMenus.map((menu) => {
//             if (menu.id === id) {
//               return { ...menu, number_dispo: response.data.number_dispo };
//             }
//             return menu;
//           });
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const getStatusBanner = (menu) => {
//     if (menu.is_declined) {
//       return { text: "Refusé", color: "red" };
//     } else if (menu.is_approved) {
//       return { text: "Accepté", color: "green" };
//     } else {
//       return { text: "En attente", color: "orange" };
//     }
//   };

//   return (
//     <>
//       <Container>
//         <div className="pageTitleHeader">Gérer les disponibilités</div>
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
//           {menus.length > 0 ? (
//             menus.map((menu, index) => (
//               <Card
//                 key={menu.id}
//                 sx={{ flexBasis: "30%", minWidth: 300 }}
//                 style={{
//                   borderRadius: 10,
//                   position: "relative",
//                   boxShadow:
//                     "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
//                 }}
//               >
//                 <Link to={`/menu/${menu.id}`}>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={
//                       menu.image !== "image/upload/null"
//                         ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
//                         : altImage
//                     }
//                     alt={menu.nom}
//                   />
//                 </Link>

//                 <CardContent>
//                   {/* Titre et bannière de statut */}
//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="space-between"
//                   >
//                     <Typography variant="h5" component="div">
//                       {menu.nom}
//                     </Typography>
//                     <Box
//                       sx={{
//                         backgroundColor: getStatusBanner(menu).color,
//                         color: "white",
//                         padding: "2px 5px",
//                         borderRadius: 5,
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {getStatusBanner(menu).text}
//                     </Box>
//                   </Box>

//                   {/* Description du menu */}
//                   <Typography variant="body2" color="text.secondary" mt={1}>
//                     {menu.description}
//                   </Typography>

//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="space-between"
//                     mt={2}
//                   >
//                     <Typography variant="body1">{menu.prix} €</Typography>
//                     <Box display="flex" alignItems="center">
//                       <Button
//                         variant="contained"
//                         color="success"
//                         onClick={() => handleIncrement(menu.id)}
//                         style={{
//                           background:
//                             "linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)",
//                         }}
//                       >
//                         +
//                       </Button>
//                       <Typography variant="body1" mx={1}>
//                         {menu.number_dispo || 0}
//                       </Typography>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleDecrement(menu.id)}
//                         style={{
//                           background:
//                             "linear-gradient(45deg, rgb(152 17 45) 12%, rgb(254 75 75) 100%)",
//                         }}
//                       >
//                         -
//                       </Button>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Typography variant="h6" color="text.secondary" align="center">
//               Il n'y a pas de menus à gérer pour le moment.
//             </Typography>
//           )}
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default ManageAvailability;

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
import altImage from "../../../src/imgs/food.png";
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

const ManageAvailability = () => {
  const [menus, setMenus] = useState([]);
  const [isVerified, setIsVerified] = useState(false); // Assume true initially
  const userId = localStorage.getItem("id");
  const [isDeclined,setIsDeclined] = useState(false);
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

    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/superadmin/admin/${userId}/menus/`
        );
        setMenus(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
    fetchMenus();
  }, [userId]);

  const handleIncrement = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/update/${id}/`,
        {
          number_dispo:
            (menus.find((menu) => menu.id === id).number_dispo || 0) + 1,
        }
      );
      setMenus((prevMenus) => {
        return prevMenus.map((menu) => {
          if (menu.id === id) {
            return { ...menu, number_dispo: response.data.number_dispo };
          }
          return menu;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrement = async (id) => {
    const currentNumberDispo =
      menus.find((menu) => menu.id === id).number_dispo || 0;
    if (currentNumberDispo > 0) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/update/${id}/`,
          {
            number_dispo: currentNumberDispo - 1,
          }
        );
        setMenus((prevMenus) => {
          return prevMenus.map((menu) => {
            if (menu.id === id) {
              return { ...menu, number_dispo: response.data.number_dispo };
            }
            return menu;
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getStatusBanner = (menu) => {
    if (menu.is_declined) {
      return { text: "Refusé", color: "red" };
    } else if (menu.is_approved) {
      return { text: "Accepté", color: "green" };
    } else {
      return { text: "En attente", color: "orange" };
    }
  };


  if (loading) {
    return null; 
  }
  if (!isVerified && !isDeclined ) {
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
      <div className="pageTitleHeader">Gérer les disponibilités</div>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
        {menus.length > 0 ? (
          menus.map((menu) => (
            <Card
              key={menu.id}
              sx={{ flexBasis: "30%", minWidth: 300 }}
              style={{
                borderRadius: 10,
                position: "relative",
                boxShadow:
                  "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
              }}
            >
              <Link to={`/menu/${menu.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    menu.image !== "image/upload/null"
                      ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                      : altImage
                  }
                  alt={menu.nom}
                />
              </Link>

              <CardContent>
                {/* Titre et bannière de statut */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" component="div">
                    {menu.nom}
                  </Typography>
                  
                  <Box
                    sx={{
                      backgroundColor: getStatusBanner(menu).color,
                      color: "white",
                      padding: "2px 5px",
                      borderRadius: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {getStatusBanner(menu).text}
                  </Box>
                </Box>

                {/* Description du menu */}
                <Typography variant="body1" color="text.secondary">
                  {menu.type}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {menu.description}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Typography variant="body1">{menu.prix} €</Typography>
                  <Box display="flex" alignItems="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleIncrement(menu.id)}
                      style={{
                        background:
                          "linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)",
                      }}
                    >
                      +
                    </Button>
                    <Typography variant="body1" mx={1}>
                      {menu.number_dispo || 0}
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDecrement(menu.id)}
                      style={{
                        background:
                          "linear-gradient(45deg, rgb(152 17 45) 12%, rgb(254 75 75) 100%)",
                      }}
                    >
                      -
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" align="center">
            Il n'y a pas de menus à gérer pour le moment.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ManageAvailability;

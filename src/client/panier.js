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
  Dialog,
  DialogContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Tooltip from '@mui/material/Tooltip';
import InfoPopup from "../components/infoPopUp";
const Panier = () => {
  function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.total);
    }, 0);
  }

  const [menus, setMenus] = useState([]);
  const [reload, setReload] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [refrenceStripe, setRefrenceStripe] = useState("");
  const [linkStripe, setLinkStripe] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [menuId, setMenuId] = useState('');
  const [fees, setFees] = useState([]);


  const userId = localStorage.getItem("id");


  const [openInfoPopup, setInfoOpenPopup] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState(false);

  const handleOpenInfoPopUp = () => {
    setInfoOpenPopup(true);
  };

  const handleCloseInfoPopUp = () => {
    setInfoOpenPopup(false);
  };



  const fetchMenus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/client/panier/`,
        {
          params: { user_id: userId },
        }
      );
      setMenus(response.data.items);
      setFees(response.data)
      // setMenuId(response.data.items.id)
      // const total = calculateTotalPrice(response.data);
      setTotalPrice(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  // Appelez fetchMenus dans useEffect pour charger les menus au montage
  useEffect(() => {
    fetchMenus();
  }, [userId, reload]);

  const addToFavMenu = async (menuId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/client/favoris/menus/`,
        {
          user_id: userId,
          menu_id: menuId,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  const removeFromFavMenu = async (menuId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/client/favoris/menus/${menuId}/`,
        {
          data: {
            user_id: userId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setPopUpMsg("Menu removed from favorite menus successfully");
      setInfoOpenPopup(true);
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromChart = async (menuId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/client/panier/delete/${menuId}/`
      );

      console.log(response.data);
      setPopUpMsg("Menu removed from Chart menus successfully");
      setInfoOpenPopup(true);
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncrement = async (menuId, menuQuantity, numberDispo) => {
    if (menuQuantity < numberDispo) {
      try {
        menuQuantity = menuQuantity + 1;
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/client/panier/update/${menuId}/`,
          {
            quantite: menuQuantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        fetchMenus();
      } catch (error) {
        console.error(error);
      }
    } else {

      setPopUpMsg("Vous avez atteint la quantité maximale disponible pour ce menu.");
      setInfoOpenPopup(true);
    }
  };

  const handleDecrement = async (menuId, menuQuantity) => {
    if (menuQuantity > 0) {
      try {
        menuQuantity = menuQuantity - 1;
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/client/panier/update/${menuId}/`,
          {
            quantite: menuQuantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Re-fetch the menus after updating the quantity
        fetchMenus();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showChart = async () => {
    setShowPopUp(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/client/panier/validate/`,
        {
          user_id: userId,
        }
      );

      console.log(response.data);
      setRefrenceStripe(response.data.reference);
      const responseStripe = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/client/create-checkout-session/`,
        {
          reference: response.data.reference,
        }
      );
      console.log(responseStripe);
      setLinkStripe(responseStripe.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const sendToStripe = () => {
    setShowPopUp(true);
  };

  const RedirectToStripeCheckoutLink = () => {
    window.location.href = linkStripe;
  };

  const uniqueAdmins = [];
  const adminIds = new Set();

  menus.forEach((item) => {
    if (!adminIds.has(item.menu.admin.id)) {
      adminIds.add(item.menu.admin.id);
      uniqueAdmins.push(item);
    }
  });

  const handleCheckboxChange = async (adminId, isChecked) => {
    console.log(adminId, isChecked)
    try {
      if (isChecked) {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/client/reserve-table/`,
          {
            admin_id: adminId,
            panier_id: 9,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/client/cancel-table/`,
          {
            admin_id: adminId,
            panier_id: 9,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      }
    } catch (error) {
      console.error(error);
    }
    setReload(!reload)
  };


  return (
    <>
      <Container>

        <InfoPopup
          open={openInfoPopup}
          handleClose={handleCloseInfoPopUp}
          message={popUpMsg}
        />


        <Dialog
          open={showPopUp}
          onClose={() => setShowPopUp(false)}
          fullWidth
          maxWidth="lg"
          PaperProps={{
            style: {
              borderRadius: 10,
              marginLeft: 340,
            },
          }}
        >
          <DialogContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 30,
                color: "rgb(40, 148, 163)",
                fontWeight: 500,
              }}
            >
              Votre Commande
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                <Typography variant="h6" component="div">
                  Menu
                </Typography>
                <Typography variant="h6" component="div">
                  Quantity
                </Typography>
                <Typography variant="h6" component="div">
                  Total
                </Typography>
              </Box>
              {menus.map((menu, index) => (
                <Box
                  key={menu.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <Typography variant="body1" component="div" sx={{ flex: 2 }}>
                    {menu.menu.nom}
                  </Typography>
                  <Typography variant="body1" component="div" sx={{ flex: 2 }}>
                    {menu.quantite}
                  </Typography>
                  <Typography variant="body1" component="div" sx={{ flex: 1 }}>
                    {menu.total} €
                  </Typography>
                  {/* <Button onClick={() => removeFromChart(menu.id)} variant="outlined" color="error">
                    X
                  </Button> */}
                </Box>
              ))}
              <Box

                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <Typography variant="body1" component="div" sx={{ flex: 2 }}>
                  Fees
                </Typography>
                <Typography variant="body1" component="div" sx={{ flex: 2 }}>
                  _
                </Typography>
                <Typography variant="body1" component="div" sx={{ flex: 1 }}>
                  {fees.fees} €
                </Typography>
              </Box>
              <Box

                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              ><Typography variant="body1" component="div" sx={{ flex: 2 }}>
                  Table Fees
                </Typography>
                <Typography variant="body1" component="div" sx={{ flex: 2 }}>
                  {fees.total_tables / 3}
                </Typography>
                <Typography variant="body1" component="div" sx={{ flex: 1 }}>
                  {fees.total_tables} €
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  borderTop: "1px solid #ddd",
                  paddingTop: "10px",
                  mt: 2,
                }}
              >
                <Typography variant="h6" component="div">
                  Total Price: {totalPrice} €
                </Typography>
              </Box>
            </Box>
            {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
              {menus.map((menu, index) => (
                <Card
                  key={menu.id}
                  sx={{ flexBasis: "30%", minWidth: 300 }}
                  style={{
                    borderRadius: 15,
                    boxShadow:
                      "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      id="deleteButton"
                      onClick={() => removeFromChart(menu.id)}
                    >
                      X
                    </Button>
                  </div>

                  <Link to={`/menu/${menu.id}`}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        menu.menu.image !== "image/upload/null"
                          ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.menu.image}`
                          : altImage
                      }
                      alt={menu.menu.nom}
                    />
                  </Link>

                  <CardContent>
                    <Typography variant="h5" component="div">
                      {menu.menu.nom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {menu.menu.description}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={2}
                    >
                      <Typography variant="body1">
                        {menu.menu.prix} €
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Button onClick={() => removeFromFavMenu(menu.id)}>
                          <FavoriteBorderIcon />
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box> */}
            <div>
              <Button
                style={{
                  background:
                    "linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)",
                  color: "white",
                }}
                onClick={RedirectToStripeCheckoutLink}
              >
                Passer au paiement
                <PointOfSaleOutlinedIcon />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div
          className="pageTitleHeader"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            Mon Panier
            {/* < ShoppingCartRoundedIcon /> */}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            Total : {totalPrice}{" "}
            <div style={{ color: "rgba(42, 161, 92, 1) 12%" }}>€</div>
          </div>
        </div>
        {menus.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ marginBottom: 5 }}>
            Pas d'articles ajoutés dans ton panier.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "25px",
              marginBottom: 5,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 10,
              padding: 5,
            }}
          >
            {menus.map((menu, index) => (
              <Card
                key={menu.id}
                sx={{ flexBasis: "30%", minWidth: 340 }}
                style={{
                  borderRadius: 15,
                  boxShadow:
                    "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    id="deleteButton"
                    onClick={() => removeFromChart(menu.id)}
                  >
                    X
                  </Button>
                </div>

                <Link to={`/client/menu/${menu.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      menu.menu.image !== "image/upload/null" && menu.is_approved
                        ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.menu.image}`
                        : "https://res.cloudinary.com/dubrka8it/image/upload/v1724978765/food_kyvzbf.png"
                    }
                    alt={menu.menu.nom}
                  />
                </Link>

                <CardContent>
                  <Typography variant="h5" component="div">
                    {menu.menu.nom}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                  {menu.menu.type}
                </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {menu.menu.description}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                  >
                    <Typography variant="body1">{menu.menu.prix} €</Typography>
                    <Box display="flex" alignItems="center">


                      <Box display="flex" alignItems="center">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleIncrement(menu.id, menu.quantite, menu.menu.number_dispo)
                          }
                          style={{
                            background:
                              "linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)",
                          }}
                        >
                          +
                        </Button>
                        <Typography variant="body1" mx={1}>
                          {menu.quantite || 0}
                        </Typography>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleDecrement(menu.id, menu.quantite)
                          }
                          style={{
                            background:
                              "linear-gradient(45deg, rgb(152 17 45) 12%, rgb(254 75 75) 100%)",
                          }}
                        >
                          -
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
        <div>
          <div className="pageTitleHeader"
            style={{ fontSize: 25, height: 30 }} >
            Cocher le restaurant si vous souhaitez manger sur place :
            <Tooltip title="Vous allez payer des frais supplémentaires si vous réservez une table">
              <InfoRoundedIcon />
            </Tooltip>
          </div>
          <ul>
            {uniqueAdmins.map((item) => {
              console.log('Menu item:', item); // Debugging to check structure
              return (
                <div key={item.menu.admin.id}>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(item.menu.admin.id, e.target.checked)
                    }
                  />
                  <strong>Restaurant:</strong> {item.menu.nom_organisme}
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <Button
            style={{
              background: menus.length === 0
                ? "grey"
                : "linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)",
              color: "white",
              marginBottom: 8
            }}

            onClick={showChart}
          >
            Valider le Panier
            <CheckCircleOutlineIcon sx={{ ml: 1 }} />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Panier;



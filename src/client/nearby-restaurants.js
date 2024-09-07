import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const createIcon = (iconComponent) => {
  const iconMarkup = renderToStaticMarkup(iconComponent);
  return L.divIcon({
    html: iconMarkup,
    className: "",
    iconSize: [35, 35],
  });
};

const clientIcon = createIcon(<AccessibilityIcon style={{ color: "blue", fontSize: 35 }} />);

const restaurantIcon = createIcon(<StorefrontIcon style={{ color: "green", fontSize: 35 }} />);

const NearbyRestaurantsMap = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // Localisation initialement nulle

  useEffect(() => {
    const fetchUserLocation = async () => {
      const userId = localStorage.getItem("id");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/check-location/`,
          {
            admin_id: userId,
          }
        );

        if (response.data.latitude && response.data.longitude) {
          setUserLocation({
            latitude: response.data.latitude,
            longitude: response.data.longitude,
          });

          const nearbyRestaurantsResponse = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/client/get-nearby-restaurants/`,
            {
              client_id: userId,
            }
          );
          setRestaurants(nearbyRestaurantsResponse.data);
        } else {
          console.error("No location found for user.");
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();
  }, []);

  if (!userLocation) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MapContainer
      center={[userLocation.latitude, userLocation.longitude]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marqueur pour l'utilisateur (client) */}
      <Marker
        position={[userLocation.latitude, userLocation.longitude]}
        icon={clientIcon}
      >
        <Popup>Vous êtes ici</Popup>
      </Marker>

      {/* Marqueurs pour les restaurants */}
      {restaurants.map((restaurant, index) => (
        <Marker
          key={index}
          position={[restaurant.latitude, restaurant.longitude]}
          icon={restaurantIcon}
        >
          <Popup>
            <Link to={`/restaurant/${restaurant.id}`}>{restaurant.nom_organisme}</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default NearbyRestaurantsMap;

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
import Typography from "@mui/material/Typography";
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
  const [userLocation, setUserLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(true);

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

        if (response.data.location_enabled === false) {
          setLocationEnabled(false);
        } else if (response.data.latitude && response.data.longitude) {
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
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();
  }, []);

  if (!locationEnabled) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Votre localisation n'est pas encore activée.
        </Typography>
      </Box>
    );
  }

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

      <Marker position={[userLocation.latitude, userLocation.longitude]} icon={clientIcon}>
        <Popup>Vous êtes ici</Popup>
      </Marker>

      {restaurants.length > 0 &&
        restaurants.map((restaurant, index) => (
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



// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import L from "leaflet";
// import { renderToStaticMarkup } from "react-dom/server";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import AccessibilityIcon from "@mui/icons-material/Accessibility";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// import { Link } from "react-router-dom";

// const createIcon = (iconComponent) => {
//   const iconMarkup = renderToStaticMarkup(iconComponent);
//   return L.divIcon({
//     html: iconMarkup,
//     className: "",
//     iconSize: [35, 35],
//   });
// };

// const clientIcon = createIcon(<AccessibilityIcon style={{ color: "blue", fontSize: 35 }} />);

// const restaurantIcon = createIcon(<StorefrontIcon style={{ color: "green", fontSize: 35 }} />);

// const NearbyRestaurantsMap = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [userLocation, setUserLocation] = useState(null); // Localisation initialement nulle

//   useEffect(() => {
//     const fetchUserLocation = async () => {
//       const userId = localStorage.getItem("id");
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/api/check-location/`,
//           {
//             admin_id: userId,
//           }
//         );

//         if (response.data.latitude && response.data.longitude) {
//           setUserLocation({
//             latitude: response.data.latitude,
//             longitude: response.data.longitude,
//           });

//           const nearbyRestaurantsResponse = await axios.post(
//             `${process.env.REACT_APP_BACKEND_URL}/client/get-nearby-restaurants/`,
//             {
//               client_id: userId,
//             }
//           );
//           setRestaurants(nearbyRestaurantsResponse.data);
//         } else {
//           console.error("No location found for user.");
//         }
//       } catch (error) {
//         console.error("Error fetching user location:", error);
//       }
//     };

//     fetchUserLocation();
//   }, []);

//   if (!userLocation) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <MapContainer
//       center={[userLocation.latitude, userLocation.longitude]}
//       zoom={13}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />

//       {/* Marqueur pour l'utilisateur (client) */}
//       <Marker
//         position={[userLocation.latitude, userLocation.longitude]}
//         icon={clientIcon}
//       >
//         <Popup>Vous êtes ici</Popup>
//       </Marker>

//       {/* Marqueurs pour les restaurants */}
//       {restaurants.map((restaurant, index) => (
//         <Marker
//           key={index}
//           position={[restaurant.latitude, restaurant.longitude]}
//           icon={restaurantIcon}
//         >
//           <Popup>
//             <Link to={`/restaurant/${restaurant.id}`}>{restaurant.nom_organisme}</Link>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default NearbyRestaurantsMap;


// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// import { Link } from "react-router-dom";

// const mapStyles = {
//   height: "100vh",
//   width: "100%",
// };

// const NearbyRestaurantsMap = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [userLocation, setUserLocation] = useState(null); // Localisation initialement nulle
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

//   const fetchUserLocation = async () => {
//     const userId = localStorage.getItem("id");
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/check-location/`,
//         {
//           admin_id: userId,
//         }
//       );

//       if (response.data.latitude && response.data.longitude) {
//         setUserLocation({
//           lat: response.data.latitude,
//           lng: response.data.longitude,
//         });

//         const nearbyRestaurantsResponse = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/client/get-nearby-restaurants/`,
//           {
//             client_id: userId,
//           }
//         );
//         setRestaurants(nearbyRestaurantsResponse.data);
//       } else {
//         console.error("No location found for user.");
//       }
//     } catch (error) {
//       console.error("Error fetching user location:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserLocation();
//   }, []);

//   if (!userLocation) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={mapStyles}
//         zoom={13}
//         center={userLocation}
//       >
//         {/* Marqueur pour l'utilisateur (client) */}
//         <Marker position={userLocation} />

//         {/* Marqueurs pour les restaurants */}
//         {restaurants.map((restaurant, index) => (
//           <Marker
//             key={index}
//             position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
//             onClick={() => setSelectedRestaurant(restaurant)}
//           />
//         ))}

//         {/* InfoWindow pour afficher les détails du restaurant sélectionné */}
//         {selectedRestaurant && (
//           <InfoWindow
//             position={{
//               lat: selectedRestaurant.latitude,
//               lng: selectedRestaurant.longitude,
//             }}
//             onCloseClick={() => setSelectedRestaurant(null)}
//           >
//             <div>
//               <Link to={`/restaurant/${selectedRestaurant.id}`}>
//                 {selectedRestaurant.nom_organisme}
//               </Link>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default NearbyRestaurantsMap;


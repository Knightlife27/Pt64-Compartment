// import React, { useEffect, useState, useContext } from 'react';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import { Context } from '../store/appContext';
// import { PropertyListing } from './propertyListing';

// const containerStyle = {
//   width: '100%',
//   height: '100vh'
// };

// const defaultCenter = {
//   lat: 37.7749,
//   lng: -122.4194
// };

// const HomeMapComponent = ({ searchResults, onMarkerClick }) => {
//   const { actions } = useContext(Context);
//   const [apartments, setApartments] = useState([]);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [center, setCenter] = useState(defaultCenter);
//   const [error, setError] = useState(null);
//   const [propertyCategories, setPropertyCategories] = useState([
//     { id: '1', categoryName: 'Favorites' },
//     { id: '2', categoryName: 'To Visit' }
//   ]);

//   useEffect(() => {
//     if (searchResults && searchResults.length > 0) {
//       console.log("Search results received:", searchResults);
//       setApartments(searchResults);
//       setCenter({
//         lat: Number(searchResults[0].latitude) || defaultCenter.lat,
//         lng: Number(searchResults[0].longitude) || defaultCenter.lng
//       });
//     }
//   }, [searchResults]);

//   const handleSaveToCategory = (property, category) => {
//     console.log(`Saving property to category: ${category}`);
//     // Implement the logic to save the property to the category
//   };

//   const handleAddCategory = (newCategory) => {
//     setPropertyCategories(prevCategories => [
//       ...prevCategories, 
//       { id: Date.now().toString(), categoryName: newCategory }
//     ]);
//   };

//   const handleMarkerClick = (apartment, index) => {
//     console.log("Selected apartment data:", apartment);
//     setSelectedApartment({
//       ...apartment,
//       location: {
//         address: apartment.location?.address || {
//           line: 'N/A',
//           city: 'N/A',
//           state_code: 'N/A',
//           postal_code: 'N/A'
//         }
//       },
//       description: apartment.description || {},
//       list_price: apartment.list_price || 'N/A',
//       list_price_max: apartment.list_price_max || 'N/A',
//       photos: apartment.photos || []
//     });
//     onMarkerClick(index);
//   };

//   console.log("Rendering HomeMapComponent with apartments:", apartments);

//   return (
//     <>
//       <LoadScript googleMapsApiKey="AIzaSyA78pBoItwl17q9g5pZPNUYmLuOnTDPVo8">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={13}
//         >
//           {apartments.map((apartment, idx) => {
//             console.log("Apartment for marker:", apartment);
//             const position = {
//               lat: Number(apartment.latitude) || defaultCenter.lat,
//               lng: Number(apartment.longitude) || defaultCenter.lng
//             };
//             console.log("Marker position:", position);
//             return (
//               <Marker
//                 key={idx}
//                 position={position}
//                 onClick={() => handleMarkerClick(apartment, idx)}
//               />
//             );
//           })}
//           {selectedApartment && (
//             <InfoWindow
//               position={{
//                 lat: Number(selectedApartment.latitude) || defaultCenter.lat,
//                 lng: Number(selectedApartment.longitude) || defaultCenter.lng
//               }}
//               onCloseClick={() => setSelectedApartment(null)}
//             >
//               <div>
//                 {console.log("InfoWindow selectedApartment:", selectedApartment)}
//                 {selectedApartment.location?.address ? (
//                   <PropertyListing
//                     property={selectedApartment}
//                     categories={propertyCategories}
//                     onSaveToCategory={handleSaveToCategory}
//                     onAddCategory={handleAddCategory}
//                   />
//                 ) : (
//                   <p>Address information not available</p>
//                 )}
//               </div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </>
//   );
// };

// export default HomeMapComponent;

import React, { useEffect, useState, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Context } from '../store/appContext';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

// Custom marker SVGs
const markerSVG = {
  default: encodeURIComponent(`
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.16344 0 0 7.16344 0 16C0 28 16 48 16 48C16 48 32 28 32 16C32 7.16344 24.8366 0 16 0Z" fill="#E53935"/>
      <circle cx="16" cy="16" r="8" fill="white"/>
    </svg>
  `),
  selected: encodeURIComponent(`
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.16344 0 0 7.16344 0 16C0 28 16 48 16 48C16 48 32 28 32 16C32 7.16344 24.8366 0 16 0Z" fill="#1E88E5"/>
      <circle cx="16" cy="16" r="8" fill="white"/>
    </svg>
  `)
};

const HomeMapComponent = ({ searchResults, onMarkerClick }) => {
  const { actions } = useContext(Context);
  const [apartments, setApartments] = useState([]);
  const [selectedApartmentIndex, setSelectedApartmentIndex] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [error, setError] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);  // New state for forcing re-renders

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      console.log("Search results received:", searchResults);
      setApartments(searchResults);
      setCenter({
        lat: Number(searchResults[0].latitude) || defaultCenter.lat,
        lng: Number(searchResults[0].longitude) || defaultCenter.lng
      });
    }
  }, [searchResults]);

  const handleMarkerClick = (apartment, index) => {
    console.log("Selected apartment data:", apartment);
    setSelectedApartmentIndex(index);
    setAnimationKey(prevKey => prevKey + 1);  // Increment the key to force re-render
    onMarkerClick(index);
  };

  console.log("Rendering HomeMapComponent with apartments:", apartments);

  return (
    <LoadScript 
      googleMapsApiKey="AIzaSyA78pBoItwl17q9g5pZPNUYmLuOnTDPVo8"
      libraries={['places', 'geometry', 'drawing']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#7c93a3" }, { lightness: "-10" }]
            },
            {
              featureType: "administrative.country",
              elementType: "geometry",
              stylers: [{ visibility: "on" }]
            },
            {
              featureType: "administrative.country",
              elementType: "geometry.stroke",
              stylers: [{ color: "#a0a4a5" }]
            },
            {
              featureType: "administrative.province",
              elementType: "geometry.stroke",
              stylers: [{ color: "#62838e" }]
            },
            {
              featureType: "landscape",
              elementType: "geometry.fill",
              stylers: [{ color: "#f1f1f1" }]
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.fill",
              stylers: [{ color: "#f1f1f1" }]
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [{ color: "#f1f1f1" }]
            },
            {
              featureType: "poi",
              elementType: "geometry.fill",
              stylers: [{ color: "#e2e2e2" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ lightness: "100" }]
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: [{ visibility: "off" }, { lightness: "100" }]
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [{ color: "#a3c7df" }]
            }
          ]
        }}
      >
        {apartments.map((apartment, idx) => {
          console.log("Apartment for marker:", apartment);
          const position = {
            lat: Number(apartment.latitude) || defaultCenter.lat,
            lng: Number(apartment.longitude) || defaultCenter.lng
          };
          console.log("Marker position:", position);
          return (
            <Marker
              key={`${idx}-${selectedApartmentIndex === idx ? animationKey : ''}`}
              position={position}
              onClick={() => handleMarkerClick(apartment, idx)}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${selectedApartmentIndex === idx ? markerSVG.selected : markerSVG.default}`,
                scaledSize: new window.google.maps.Size(32, 48),
                anchor: new window.google.maps.Point(16, 48),
              }}
              animation={selectedApartmentIndex === idx ? window.google.maps.Animation.DROP : null}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default HomeMapComponent;
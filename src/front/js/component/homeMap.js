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

// const HomeMapComponent = ({ searchResults }) => {
//   const { actions } = useContext(Context);
//   const [apartments, setApartments] = useState([]);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [center, setCenter] = useState(defaultCenter);
//   const [error, setError] = useState(null);
//   const [propertyCategories, setPropertyCategories] = useState(['Favorites', 'To Visit']);

//   useEffect(() => {
//     if (searchResults && searchResults.length > 0) {
//       console.log("Search results received:", searchResults);
//       setApartments(searchResults);
//       setCenter({
//         lat: Number(searchResults[0].latitude),
//         lng: Number(searchResults[0].longitude)
//       });
//     }
//   }, [searchResults]);

//   const handleSaveToCategory = (property, category) => {
//     console.log(`Saving property to category: ${category}`);
//   };

//   const handleAddCategory = (newCategory) => {
//     setPropertyCategories([...propertyCategories, newCategory]);
//   };

//   console.log("Rendering HouseMapComponent with apartments:", apartments);

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
//               lat: Number(apartment.latitude),
//               lng: Number(apartment.longitude)
//             };
//             console.log("Marker position:", position);
//             return (
//               <Marker
//                 key={idx}
//                 position={position}
//                 onClick={() => {
//                   console.log("Selected apartment data:", apartment);
//                   setSelectedApartment(apartment);
//                 }}
//               />
//             );
//           })}
//           {selectedApartment && (
//             <InfoWindow
//               position={{
//                 lat: Number(selectedApartment.latitude),
//                 lng: Number(selectedApartment.longitude)
//               }}
//               onCloseClick={() => setSelectedApartment(null)}
//             >
//               <div>
//                 {console.log("InfoWindow selectedApartment:", selectedApartment)}
//                 <PropertyListing
//                   property={selectedApartment}
//                   categories={propertyCategories}
//                   onSaveToCategory={handleSaveToCategory}
//                   onAddCategory={handleAddCategory}
//                 />
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
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Context } from '../store/appContext';
import { PropertyListing } from './propertyListing';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

const HomeMapComponent = ({ searchResults }) => {
  const { actions } = useContext(Context);
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [error, setError] = useState(null);
  const [propertyCategories, setPropertyCategories] = useState([
    { id: '1', categoryName: 'Favorites' },
    { id: '2', categoryName: 'To Visit' }
  ]);

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

  const handleSaveToCategory = (property, category) => {
    console.log(`Saving property to category: ${category}`);
    // Implement the logic to save the property to the category
  };

  const handleAddCategory = (newCategory) => {
    setPropertyCategories(prevCategories => [
      ...prevCategories, 
      { id: Date.now().toString(), categoryName: newCategory }
    ]);
  };

  const handleMarkerClick = (apartment) => {
    console.log("Selected apartment data:", apartment);
    setSelectedApartment({
      ...apartment,
      location: {
        address: apartment.location?.address || {
          line: 'N/A',
          city: 'N/A',
          state_code: 'N/A',
          postal_code: 'N/A'
        }
      },
      description: apartment.description || {},
      list_price: apartment.list_price || 'N/A',
      list_price_max: apartment.list_price_max || 'N/A',
      photos: apartment.photos || []
    });
  };

  console.log("Rendering HomeMapComponent with apartments:", apartments);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyA78pBoItwl17q9g5pZPNUYmLuOnTDPVo8">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
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
                key={idx}
                position={position}
                onClick={() => handleMarkerClick(apartment)}
              />
            );
          })}
          {selectedApartment && (
            <InfoWindow
              position={{
                lat: Number(selectedApartment.latitude) || defaultCenter.lat,
                lng: Number(selectedApartment.longitude) || defaultCenter.lng
              }}
              onCloseClick={() => setSelectedApartment(null)}
            >
              <div>
                {console.log("InfoWindow selectedApartment:", selectedApartment)}
                {selectedApartment.location?.address ? (
                  <PropertyListing
                    property={selectedApartment}
                    categories={propertyCategories}
                    onSaveToCategory={handleSaveToCategory}
                    onAddCategory={handleAddCategory}
                  />
                ) : (
                  <p>Address information not available</p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default HomeMapComponent;
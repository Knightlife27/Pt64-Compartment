// import React, { useState, useRef } from "react";
// import MapComponent from "./homeMap";
// import HomeSearch from "./homeSearch";
// import ApartmentList from "./apartmentList";
// import { Container, Row, Col } from 'react-bootstrap'

// export const HomeSearchPage = () => {
//   const [mapData, setMapData] = useState([]);
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedApartmentIndex, setSelectedApartmentIndex] = useState(null);
//   const apartmentRefs = useRef([]);

//   const handleSearchResults = (results) => {
//     setIsLoading(false);
//     setError(null);
//     setSearchResults(results);
//     if (results && results.apartments) {
//       const newMapData = results.apartments.map(apt => ({
//         latitude: apt.latitude,
//         longitude: apt.longitude,
//         address: apt.address,
//         price: apt.price,
//         bedrooms: apt.bedrooms,
//         bathrooms: apt.bathrooms,
//         living_area: apt.livingArea,
//         image_url: apt.image_url
//       }));
//       console.log("Map Data:", newMapData);
//       setMapData(newMapData);
//     }
//   };

//   const startSearch = () => {
//     setIsLoading(true);
//     setError(null);
//     setSearchResults(null);
//   };

//   const handleSearchError = (errorMessage) => {
//     setIsLoading(false);
//     setError(errorMessage);
//     setSearchResults(null);
//   };

//   const groupApartments = (apartments) => {
//     const grouped = [];
//     for (let i = 0; i < apartments.length; i += 2) {
//       grouped.push(apartments.slice(i, i + 2));
//     }
//     return grouped;
//   };

//   const handleMarkerClick = (index) => {
//     setSelectedApartmentIndex(index);
//     if (apartmentRefs.current[index]) {
//       apartmentRefs.current[index].scrollIntoView({ 
//         behavior: 'smooth', 
//         block: 'nearest'
//       });
//     }
//   };

//   return (
//     <div className="search-page">
//       <div className="map-column">
//         <div className="map-container map-card">
//           <div className="map-title">Property Locations</div>
//           <div className="map-component">
//             <MapComponent 
//               searchResults={mapData} 
//               onMarkerClick={handleMarkerClick}
//             />
//           </div>
//         </div>
//       </div>
      
//       <div className="search-column">
//         <div className="search-input">
//           <HomeSearch 
//             onSearchResults={handleSearchResults} 
//             onStartSearch={startSearch}
//             onSearchError={handleSearchError}
//           />
//         </div>
//         <div className="search-results">
//           {isLoading && <p className="loading-message">Loading...</p>}
//           {error && <p className="error-message">{error}</p>}
//           {!isLoading && !error && searchResults && (
//             <>
//               <h2>Search Results</h2>
//               {searchResults.apartments && searchResults.apartments.length > 0 ? (
//                 <Container fluid>
//                   {groupApartments(searchResults.apartments).map((pair, rowIndex) => (
//                     <Row key={rowIndex} className="apartment-row mb-4">
//                       {pair.map((apartment, colIndex) => {
//                         const index = rowIndex * 2 + colIndex;
//                         return (
//                           <Col key={apartment.id} xs={12} md={6}>
//                             <div 
//                               ref={el => apartmentRefs.current[index] = el}
//                               className={`apartment-wrapper ${selectedApartmentIndex === index ? 'highlighted' : ''}`}
//                             >
//                               <ApartmentList apartments={[apartment]} />
//                             </div>
//                           </Col>
//                         );
//                       })}
//                     </Row>
//                   ))}
//                 </Container>
//               ) : (
//                 <p>No apartments found. Try adjusting your search criteria.</p>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeSearchPage;

import React, { useState, useRef, useEffect } from "react";
import MapComponent from "./homeMap";
import HomeSearch from "./homeSearch";
import ApartmentList from "./apartmentList";
import { Container, Row, Col } from 'react-bootstrap'

export const HomeSearchPage = () => {
  const [mapData, setMapData] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedApartmentIndex, setSelectedApartmentIndex] = useState(null);
  const apartmentRefs = useRef([]);

  const handleSearchResults = (results) => {
    setIsLoading(false);
    setError(null);
    setSearchResults(results);
    if (results && results.apartments) {
      const newMapData = results.apartments.map(apt => ({
        latitude: apt.latitude,
        longitude: apt.longitude,
        address: apt.address,
        price: apt.price,
        bedrooms: apt.bedrooms,
        bathrooms: apt.bathrooms,
        living_area: apt.livingArea,
        image_url: apt.image_url
      }));
      console.log("Map Data:", newMapData);
      setMapData(newMapData);
    }
  };

  const startSearch = () => {
    setIsLoading(true);
    setError(null);
    setSearchResults(null);
  };

  const handleSearchError = (errorMessage) => {
    setIsLoading(false);
    setError(errorMessage);
    setSearchResults(null);
  };

  const groupApartments = (apartments) => {
    const grouped = [];
    for (let i = 0; i < apartments.length; i += 3) {
      grouped.push(apartments.slice(i, i + 3));
    }
    return grouped;
  }

  const handleMarkerClick = (index) => {
    setSelectedApartmentIndex(index);
    if (apartmentRefs.current[index]) {
      apartmentRefs.current[index].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest'
      });
    }
  };

  useEffect(() => {
    // Reset selected apartment index when new search results are loaded
    setSelectedApartmentIndex(null);
  }, [searchResults]);

  return (
    <div className="search-page">
      <div className="map-column">
        <div className="map-container map-card">
          <div className="map-title">Find Your Nest</div>
          <div className="map-component">
            <MapComponent 
              searchResults={mapData} 
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
      </div>
      
      <div className="search-column">
        <div className="search-input">
          <HomeSearch 
            onSearchResults={handleSearchResults} 
            onStartSearch={startSearch}
            onSearchError={handleSearchError}
          />
        </div>
        <div className="search-results">
          {isLoading && <p className="loading-message">Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {!isLoading && !error && searchResults && (
            <>
              <h2>Search Results</h2>
              {searchResults.apartments && searchResults.apartments.length > 0 ? (
                <Container fluid>
                  {groupApartments(searchResults.apartments).map((pair, rowIndex) => (
                    <Row key={rowIndex} className="apartment-row mb-4">
                      {pair.map((apartment, colIndex) => {
                        const index = rowIndex * 3 + colIndex;
                        return (
                          <Col key={apartment.id} xs={12} md={4}>
                            <div 
                              ref={el => apartmentRefs.current[index] = el}
                              className={`apartment-wrapper ${selectedApartmentIndex === index ? 'highlighted' : ''}`}
                            >
                              <ApartmentList apartments={[apartment]} />
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  ))}
                </Container>
              ) : (
                <p>No apartments found. Try adjusting your search criteria.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSearchPage;
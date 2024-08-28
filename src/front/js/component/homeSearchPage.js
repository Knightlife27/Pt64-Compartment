import React, { useState, useRef, useEffect } from "react";
import MapComponent from "./homeMap";
import ApartmentList from "./apartmentList";
import { Container, Row, Col } from 'react-bootstrap'
import HomeMapSearchBar from "./homeMapSearchBar";
import newLogo from "../../../assets/newLogo.png";

export const HomeSearchPage = () => {
  const [mapData, setMapData] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedApartmentIndex, setSelectedApartmentIndex] = useState(null);
  const apartmentRefs = useRef([]);

  const handleSearch = async (searchCriteria) => {
    console.log('Starting handleSearch');
    setIsLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      const preferences = {
        location: searchCriteria.location,
        bedrooms: searchCriteria.beds,
        bathrooms: searchCriteria.baths,
        sort: "Newest"
      };

      console.log("Search preferences:", preferences);

      const response = await fetch(process.env.BACKEND_URL + "api/analyze_apartments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response received:", data);
      
      if (data.apartments && data.apartments.length > 0) {
        const processedApartments = processApartments(data.apartments);
        handleSearchResults({ ...data, apartments: processedApartments });
      } else {
        console.log("No apartments found in the response");
        handleSearchResults(data);
      }
    } catch (error) {
      console.error("Error in handleSearch:", error);
      handleSearchError("An error occurred while fetching results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const processApartments = (apartments) => {
    return apartments.map(apt => {
      let lat = apt.latitude;
      let lng = apt.longitude;

      if (!lat && !lng && apt.location && apt.location.address && apt.location.address.coordinate) {
        lat = apt.location.address.coordinate.lat;
        lng = apt.location.address.coordinate.lon;
      }

      return {
        id: apt.zpid,
        latitude: lat,
        longitude: lng,
        address: apt.address,
        price: apt.price,
        bedrooms: apt.bedrooms,
        bathrooms: apt.bathrooms,
        livingArea: apt.living_area,
        imageUrl: apt.image_url || apt.imgSrc,
      };
    }).filter(apt => apt.latitude && apt.longitude);
  };

  const handleSearchResults = (results) => {
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
        image_url: apt.imageUrl
      }));
      console.log("Map Data:", newMapData);
      setMapData(newMapData);
    }
  }; 

  const handleSearchError = (errorMessage) => {
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
    setSelectedApartmentIndex(null);
  }, [searchResults]);

  useEffect(() => {
    apartmentRefs.current.forEach(ref => {
      if (ref) ref.classList.remove('highlighted');
    });

    if (selectedApartmentIndex !== null && apartmentRefs.current[selectedApartmentIndex]) {
      apartmentRefs.current[selectedApartmentIndex].classList.add('highlighted');
    }
  }, [selectedApartmentIndex]);

  return (
    <div className="search-page">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md={6} lg={7} className="map-column p-0">
            <div className="map-container h-100">
              <div className="map-title">Find Your Nest</div>
              <div className="map-component h-100">
                <MapComponent 
                  searchResults={mapData} 
                  onMarkerClick={handleMarkerClick}
                />
              </div>
            </div>
          </Col>
          
          <Col md={6} lg={5} className="search-column d-flex flex-column">
            <Container fluid className="py-3">
              <Row className="align-items-center mb-3">
                <Col xs={12} md={8}>
                  <div className="search-input">
                    <HomeMapSearchBar onSearch={handleSearch} />
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className="logo text-center text-md-end">
                    <img src={newLogo} alt="Find Your Nest" className="nest-image img-fluid" style={{maxHeight: '60px'}} />
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="search-results flex-grow-1 overflow-auto">
              {isLoading && <p className="loading-message">Loading...</p>}
              {error && <p className="error-message">{error}</p>}
              {!isLoading && !error && searchResults && (
                <>
                  <h2 className="mb-3">Search Results</h2>
                  {searchResults.apartments && searchResults.apartments.length > 0 ? (
                    <Container fluid>
                      <Row>
                        {searchResults.apartments.map((apartment, index) => (
                          <Col key={apartment.id} xs={12} md={6} lg={4} className="mb-4">
                            <div 
                              ref={el => apartmentRefs.current[index] = el}
                              className="apartment-wrapper h-100"
                            >
                              <ApartmentList apartments={[apartment]} />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  ) : (
                    <p>No apartments found. Try adjusting your search criteria.</p>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeSearchPage;
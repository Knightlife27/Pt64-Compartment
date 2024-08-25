// import React from 'react';

// const ApartmentList = ({ apartments }) => {
//   const handleImageError = (e, apartment) => {
//     console.error(`Error loading image for apartment: ${apartment.address}`);
//     console.error(`Image URL: ${apartment.imageUrl || apartment.image_url}`);
//     e.target.src = 'https://via.placeholder.com/150?text=No+Image'; // Placeholder image
//   };

//   return (
//     <div className="apartment-list">
//       {apartments.map((apartment, index) => {
//         const imageUrl = apartment.imageUrl || apartment.image_url;
//         return (
//           <div key={index} className="house-info">
//             <div className="house-image">
//               <img
//                 src={imageUrl || 'https://via.placeholder.com/150?text=No+Image'}
//                 alt={`Apartment ${index + 1}`}
//                 onError={(e) => handleImageError(e, apartment)}
//               />
//             </div>
//             <div className="house-price">
//               <span>${apartment.price.toLocaleString()}</span>
//             </div>
//             <ul className="house-meta">
//               <li>{apartment.address}</li>
//               <li>{apartment.livingArea || apartment.living_area} sqft</li>
//               <li>{apartment.bedrooms} bed, {apartment.bathrooms} bath</li>
//             </ul>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ApartmentList;

import React from 'react';
import { Button } from 'react-bootstrap';

const ApartmentList = ({ apartments }) => {
  const handleImageError = (e, apartment) => {
    console.error(`Error loading image for apartment: ${apartment.address}`);
    console.error(`Image URL: ${apartment.imageUrl || apartment.image_url}`);
    e.target.src = 'https://via.placeholder.com/150?text=No+Image'; // Placeholder image
  };

  const handleViewDetails = (apartment) => {
    // Implement logic to show property details
    console.log("Viewing details for apartment:", apartment);
  };

  const handleContactAgent = (apartment) => {
    // Implement logic to contact agent
    console.log("Contacting agent for apartment:", apartment);
  };

  return (
    <div className="apartment-list">
      {apartments.map((apartment, index) => {
        const imageUrl = apartment.imageUrl || apartment.image_url;
        return (
          <div key={index} className="house-info">
            <div className="house-image">
              <img
                src={imageUrl || 'https://via.placeholder.com/150?text=No+Image'}
                alt={`Apartment ${index + 1}`}
                onError={(e) => handleImageError(e, apartment)}
              />
            </div>
            <div className="house-price">
              <span>${apartment.price.toLocaleString()}</span>
            </div>
            <ul className="house-meta">
              <li>{apartment.address}</li>
              <li>{apartment.livingArea || apartment.living_area} sqft</li>
              <li>{apartment.bedrooms} bed, {apartment.bathrooms} bath</li>
              <li className="property-buttons">
                <Button variant="primary" onClick={() => handleViewDetails(apartment)}>View Details</Button>
                <Button variant="secondary" onClick={() => handleContactAgent(apartment)}>Contact Agent</Button>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ApartmentList;
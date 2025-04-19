import React, { useEffect, useState } from 'react';

// Functional component to fetch and display fruit images
const FruitImage = ({fruitName}) => {
 // Example fruit name, can be passed as a prop or state
  const [imageUrl, setImageUrl] = useState('');  // State to store the image URL
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);     // Error state for handling issues

  useEffect(() => {
    // Fetch image based on the fruit name
    const fetchFruitImage = async () => {
      setLoading(true);  // Set loading to true before fetching
      setError(null);    // Reset error before new fetch

      try {
        // Fetch request to Pexels API with the fruit name and API key
        const response = await fetch(`https://api.pexels.com/v1/search?query=${fruitName}&per_page=1`, {
          headers: {
            Authorization: 'zz9JSxmIzsO55g0kn7uwAaQWhMrf4z36xnA3Fa40OmCAEFCgTLUdXOW0',  // Replace with your Pexels API key
          },
        });

        // Parse the response as JSON
        const data = await response.json();

        // Check if the response contains photos
        if (data.photos && data.photos.length > 0) {
          setImageUrl(data.photos[0].src.original);  // Set the image URL from the response
        } else {
          setError('Image not found');  // Handle no results
        }
      } catch (err) {
        setError('Failed to fetch image');  // Handle fetch error
        console.error(err);
      } finally {
        setLoading(false);  // Set loading to false once the request completes
      }
    };

    // Call the fetch function
    fetchFruitImage();
  }, [fruitName]);  // Effect dependency is the fruitName prop

  return (
    <div>
      {imageUrl && !loading && <img src={imageUrl} alt={fruitName} className='fruit-image' />}
    </div>
  );
};

export default FruitImage;

import React, { useState } from 'react';
import axios from 'axios';

const CarCodeLookup = () => {
  const [carCode, setCarCode] = useState('');
  const [codeResult, setCodeResult] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCarCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make GET request to Django API
    axios
      .get(`http://localhost:8000/api/lookup/${carCode}/`)
      .then((response) => {
        // Update component state with the API response
        setCodeResult(response.data.description);
        setError('');
      })
      .catch((error) => {
        // Handle API error
        setCodeResult('');
        setError('Code not found.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Car Code:
          <input type="text" value={carCode} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {codeResult && <p>{codeResult}</p>}
    </div>
  );
};

export default CarCodeLookup;

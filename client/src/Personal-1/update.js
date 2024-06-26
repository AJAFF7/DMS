import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePersonal = () => {
  const [personalData, setPersonalData] = useState([]);
  const [updateId, setUpdateId] = useState('');
  const [updateData, setUpdateData] = useState({
    pername: '',
    quantity: '',
    price: '',
    dameg: '',
  });
  const [error, setError] = useState(null);

  // Function to fetch personal data
  const fetchPersonalData = async () => {
    try {
      const response = await axios.get('/auth/personal1'); // Adjust the endpoint as needed
      setPersonalData(response.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to update a personal data item
  const updatePersonalItem = async () => {
    try {
      await axios.patch(`/auth/personal1/${updateId}`, updateData); // Adjust the endpoint as needed
      fetchPersonalData(); // Refresh the data after updating
      setUpdateId(''); // Clear the input field after updating
      setUpdateData({
        pername: '',
        quantity: '',
        price: '',
        dameg: '',
      }); // Reset the updateData state
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to set updateData state
  const handleUpdateChange = (field, value) => {
    setUpdateData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    fetchPersonalData();
  }, []); // Fetch data on component mount

  return (
    <div>
      <h1>Personal Data</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {personalData.map((item) => (
          <li key={item._id}>
            {item.pername} - {item.quantity} - {item.price} - {item.dameg}
            <button onClick={() => setUpdateId(item._id)}>Update</button>
          </li>
        ))}
      </ul>
      {updateId && (
        <div>
          <h2>Update Item</h2>
          <label htmlFor="updateId">ID:</label>
          <input
            type="text"
            id="updateId"
            value={updateId}
            disabled // Disable editing the ID
          />
          <label htmlFor="updatePername">Pername:</label>
          <input
            type="text"
            id="updatePername"
            value={updateData.pername}
            onChange={(e) => handleUpdateChange('pername', e.target.value)}
          />
          <label htmlFor="updateQuantity">Quantity:</label>
          <input
            type="text"
            id="updateQuantity"
            value={updateData.quantity}
            onChange={(e) => handleUpdateChange('quantity', e.target.value)}
          />
          <label htmlFor="updatePrice">Price:</label>
          <input
            type="text"
            id="updatePrice"
            value={updateData.price}
            onChange={(e) => handleUpdateChange('price', e.target.value)}
          />
          <label htmlFor="updateDameg">Dameg:</label>
          <input
            type="text"
            id="updateDameg"
            value={updateData.dameg}
            onChange={(e) => handleUpdateChange('dameg', e.target.value)}
          />
          <button onClick={updatePersonalItem}>Update Item</button>
        </div>
      )}
    </div>
  );
};

export default UpdatePersonal;


import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import apiClient from "../services/apiClient.js";

const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-40c6ca2c-7cf3-4d17-990c-df16f32aad42");

  const createPreference = async () => {
    try {
      const response = await apiClient.post("/create_preference", {
        description: "Donation",
        price: 100,
        quantity: 1,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error creating MercadoPago preference:", error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className='card-product-container'>
      <div className='card-product'>
        <div className='card'>
          <h3>Donation</h3>
          <p className='price'>1000 $</p>
          <button onClick={handleBuy}>Buy</button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </div>
    </div>
  );
};

export default Product;
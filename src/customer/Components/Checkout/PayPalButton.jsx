import React, { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ orderId }) => {
  const paypalOptions = {
    clientId: "YOUR_PAYPAL_CLIENT_ID",
  };

  const handleOnApprove = (data, actions) => {
    
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "TOTAL_AMOUNT",
                },
              },
            ],
          });
        }}
        onApprove={handleOnApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

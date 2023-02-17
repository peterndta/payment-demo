import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";

const amount = "0.5";
const currency = "USD";

const Paypal = ({ setCheckOut }) => {
  const [PaidFor, setPaidFor] = useState(false);
  const [Error, setError] = useState(null);

  function handleApprove() {
    // Call BE to fullfill order

    // If res is success
    setPaidFor(true);
    // Refresh user's account or subscrip status

    // if the res is error
  }

  if (PaidFor) {
    alert("Thank for purchase!");
    setCheckOut(false);
  }

  if (Error) {
    alert(Error);
  }

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "disable-funding": "card",
          "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        }}
      >
        <PayPalButtons
          style={{
            color: "silver",
            // layout: "horizontal",
            tagline: false,
            shape: "pill",
          }}
          onClick={(data, actions) => {
            const hasAlreadyBoughtCourse = false; // = true nếu mua rồi và sẽ hiện alert báo đã mua rồi -> default = false

            if (hasAlreadyBoughtCourse) {
              setError("You bought this already");

              return actions.reject();
            } else {
              return actions.resolve();
            }
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "1 Month Subscription",
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);

            handleApprove();
          }}
          onCancel={() => {}}
          onError={(error) => {
            setError(error);
            console.log(Error);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;

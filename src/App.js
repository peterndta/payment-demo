import { Button } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Paypal from "./components/Paypal";

function App() {
  const [checkOut, setCheckOut] = useState(false);

  return (
    <>
      {checkOut ? (
        <Paypal setCheckOut={setCheckOut}/>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            setCheckOut(true);
          }}
        >
          Checkout
        </Button>
      )}
    </>
  );
}

export default App;

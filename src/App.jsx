import { createContext, useContext, useState } from "react";
import "./App.css";
// step1
const shopCtx = createContext(null);
export default function App() {
  const [prodPrice, setProductPrice] = useState(5000);
  const [cartCount, setCartCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  return (
    <div className="App">
      {/* step2 creating provider and passing values */}
      <shopCtx.Provider
        value={{
          cartCount,
          setCartCount,
          prodPrice,
          setProductPrice,
          totalCost,
          setTotalCost
        }}
      >
        <ALLComponent />
      </shopCtx.Provider>
    </div>
  );
}

function ALLComponent() {
  return (
    <div>
      <ProductCard />
      <Cart />
      <AdminControl />
    </div>
  );
}

function ProductCard() {
  //step 3 use the context
  const { prodPrice, cartCount, setCartCount, setTotalCost } = useContext(
    shopCtx
  );
  return (
    <div className="prod-card">
      <img src="https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw17940ed5/images/large/195969748763-1.jpg" />
      <div className="cart-action">
        <button onClick={() => setCartCount(cartCount + 1)}>+</button>
        <p>{cartCount}</p>
        <button onClick={() => setCartCount(cartCount - 1)}>-</button>
      </div>
      <p>Price {prodPrice}</p>
      <button onClick={() => setTotalCost(prodPrice * cartCount)}>
        checkout
      </button>
    </div>
  );
}

function Cart() {
  const { totalCost, cartCount, setCartCount } = useContext(shopCtx);
  return (
    <div className="prod-card">
      <h3>Items in cart</h3>
      <div className="cart-action">
        <button onClick={() => setCartCount(cartCount + 1)}>+</button>
        <p>{cartCount}</p>
        <button onClick={() => setCartCount(cartCount - 1)}>-</button>
      </div>
      <h3>Total : {totalCost}</h3>
      <button
        onClick={() => {
          setCartCount(0);
        }}
      >
        BUY
      </button>
    </div>
  );
}

function AdminControl() {
  const { prodPrice, setProductPrice } = useContext(shopCtx);
  return (
    <div>
      <input
        type="number"
        onChange={(e) => setProductPrice(e.target.value)}
        value={prodPrice}
      />
    </div>
  );
}

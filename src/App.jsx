/* eslint-disable no-undef */
import { createContext, useContext, useState,useReducer } from "react";
import "./App.css";
// step1
// store
const store = {
  prodPrice: 5000,
  cartCount: 0,
  totalCost: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "inc_cart_value":
      return { ...state, cartCount: state.cartCount + 1 };
    case "dec_cart_value":
      return { ...state, cartCount: state.cartCount - 1 };
    case "change_prod_price":
      return { ...state, prodPrice: action.payload };
      case "total_cast":
      return {...state,totalCost:state.prodPrice*state.cartCount}
    case "buy":
      return{...state,cartCount:0,totalCost:0}
      default:
      return state;
  }
};

const shopCtx = createContext(null);
export default function App() {
  const [totalCost, setTotalCost] = useState(0);

  const [state, dispatch] = useReducer(reducer, store);
  return (
    <div className="App">
      {/* step2 creating provider and passing values */}
      <shopCtx.Provider
        value={{
          totalCost,
          setTotalCost,
          state,
          dispatch
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
  const {  state, dispatch } = useContext(shopCtx);
  return (
    <div className="prod-card">
      <img src="https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw17940ed5/images/large/195969748763-1.jpg" />
      <div className="cart-action">
        <button onClick={() => dispatch({ type: "inc_cart_value" })}>+</button>
        <p>{state.cartCount}</p>
        <button onClick={() => dispatch({ type: "dec_cart_value" })}>-</button>
      </div>
      <p>Price {state.prodPrice}</p>
      <button onClick={() => dispatch({type:"total_cast"})}>
        checkout
      </button>
    </div>
  );
}

function Cart() {
  const {  state, dispatch } = useContext(shopCtx);
  return (
    <div className="prod-card">
      <h3>Items in cart</h3>
      <div className="cart-action">
        <button onClick={() => dispatch({ type: "inc_cart_value" })}>+</button>
        <p>{state.cartCount}</p>
        <button onClick={() => dispatch({ type: "dec_cart_value" })}>-</button>
      </div>
      <h3>Total : {state.totalCost}</h3>
      <button onClick={()=>dispatch({type:"buy"})}>
        BUY
      </button>
    </div>
  );
}

function AdminControl() {
  const { state, dispatch } = useContext(shopCtx);
  return (
    <div>
      <input
        type="number"
        onChange={(e) =>
          dispatch({ type: "change_prod_price", payload: e.target.value })
        }
        value={state.prodPrice}
      />
    </div>
  );
}

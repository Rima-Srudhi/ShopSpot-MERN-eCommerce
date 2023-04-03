// import React, {useContext, useState, useEffect} from 'react'
// import {GlobalState} from '../../../GlobalState'
// import axios from 'axios'
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

// function Cart() {
//     const state = useContext(GlobalState)
//     const [cart, setCart] = state.userAPI.cart
//     const [token] = state.token
//     const [total, setTotal] = useState(0)

//     useEffect(() =>{
//         const getTotal = () =>{
//             const total = cart.reduce((prev, item) => {
//                 return prev + (item.price * item.quantity)
//             },0)

//             setTotal(total)
//         }

//         getTotal()

//     },[cart])

//     const addToCart = async (cart) =>{
//         await axios.patch('/user/addcart', {cart}, {
//             headers: {Authorization: token}
//         })
//     }


//     const increment = (id) =>{
//         cart.forEach(item => {
//             if(item._id === id){
//                 item.quantity += 1
//             }
//         })

//         setCart([...cart])
//         addToCart(cart)
//     }

//     const decrement = (id) =>{
//         cart.forEach(item => {
//             if(item._id === id){
//                 item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
//             }
//         })

//         setCart([...cart])
//         addToCart(cart)
//     }

//     const removeProduct = id =>{
//         if(window.confirm("Do you want to delete this product?")){
//             cart.forEach((item, index) => {
//                 if(item._id === id){
//                     cart.splice(index, 1)
//                 }
//             })

//             setCart([...cart])
//             addToCart(cart)
//         }
//     }

//     const tranSuccess = async(payment) => {
//         const {paymentID, address} = payment;

//         await axios.post('/api/payment', {cart, paymentID, address}, {
//             headers: {Authorization: token}
//         })

//         setCart([])
//         addToCart([])
//         alert("You have successfully placed an order.")
//     }


//     if(cart.length === 0) 
//         return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

//     return (
//         <div>
//             {
//                 cart.map(product => (
//                     <div className="detail cart" key={product._id}>
//                         <img src={product.images.url} alt="" />

//                         <div className="box-detail">
//                             <h2>{product.title}</h2>

//                             <h3>$ {product.price * product.quantity}</h3>
//                             <p>{product.description}</p>
//                             <p>{product.content}</p>

//                             <div className="amount">
//                                 <button onClick={() => decrement(product._id)}> - </button>
//                                 <span>{product.quantity}</span>
//                                 <button onClick={() => increment(product._id)}> + </button>
//                             </div>

//                             <div className="delete" 
//                             onClick={() => removeProduct(product._id)}>
//                                 X
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             }

//             <div className="total">
//                 <h3>Total: $ {total}</h3>
//                 <PayPalScriptProvider 
//           options={{
//             "client-id":
//             "AVi7UQVu_bMKAmBKUNFSQMUjpY_yy565kfyUwaWWsge_0vzNPU6RHX6ERt6K40Nbr_NBk_VcmkoxeFKT"}}>
//             {/* <PayPalButtons  */}
//             <PayPalButtons
//             createOrder={(data, actions) => {
//               return actions.order.create({
//                 purchase_units: [
//                   {
//                     amount: {
//                       value: total.toFixed(2) // pass the total as the value field
//                     }
//                   }
//                 ]
//               })
//             }}
//             onApprove={(data, actions) => {
//               return actions.order.capture().then(tranSuccess)
//             }}
//           />
          
//             {/* total={total}
//             tranSuccess={tranSuccess}                     
//             /> */}
//           </PayPalScriptProvider>     

//             </div>
//         </div>

//     )
// }

// export default Cart

// working code without emi

// below working emi and paypal shown

import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [emiOption, setEmiOption] = useState(0);
  const [emiTotal, setEmiTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };


  const handleEmiOptionChange = (event) => {
    const value = event.target.value;
    setEmiOption(value);
    const interestRate = value === "3" ? 5 : value === "6" ? 10 : value === "9" ? 15 : 20;
    const emi = (total * (1 + interestRate / 100)) / value;
    setEmiTotal(emi.toFixed(2));
    const emiPercentage = ((emi / total) * 100).toFixed(2);
    console.log(`EMI Option: ${value} months\nInterest Rate: ${interestRate}%\nEMI Amount: $${emi}\nEMI Percentage: ${emiPercentage}%`);
  };
  
  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

    return (
        <div>
          {cart.map((product) => (
            <div className="detail cart" key={product._id}>
              <img src={product.images.url} alt="" />
      
              <div className="box-detail">
                <h2>{product.title}</h2>
      
                <h3>$ {product.price * product.quantity}</h3>
                <p>{product.description}</p>
                <p>{product.content}</p>
      
                <div className="amount">
                  <button onClick={() => decrement(product._id)}> - </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increment(product._id)}> + </button>
                </div>
      
                <div
                  className="delete"
                  onClick={() => removeProduct(product._id)}
                >
                  X
                </div>
              </div>
            </div>
          ))}
             

  <div className="total">
    <h3>Total: $ {total}</h3>
    <h3>EMI Total: $ {emiTotal}</h3>


    <div>
      <label>EMI Options: </label>
      <select value={emiOption} onChange={handleEmiOptionChange}>
        <option value={0}>Select Option</option>
        <option value={3}>3 Months @ 5% </option>
        <option value={6}>6 Months @ 10%</option>
        <option value={9}>9 Months @ 15%</option>
        <option value={12}>12 Months @ 20%</option>
      </select>
      
    </div>

    <PayPalScriptProvider options={{ "client-id": "AVi7UQVu_bMKAmBKUNFSQMUjpY_yy565kfyUwaWWsge_0vzNPU6RHX6ERt6K40Nbr_NBk_VcmkoxeFKT" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((payment) => {
            tranSuccess(payment);
          });
        }}
        />
    </PayPalScriptProvider>
  </div>
</div>
);
}

export default Cart;


/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import Swal from 'sweetalert2';
import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import styles from './ShoppingCart.module.css';
import NavBar from '../../components/navBar/NavBar';
import { removeFromCart , finishPurchase} from '../../redux/actions';

function ShoppingCart() {

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({})
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);
  const [objectPago, setObjectPago] = useState([]);

  useEffect(() => {
    const newTotalPrice = cart.reduce((total, product) => {
      const quantity = quantities[JSON.stringify(product.size)] || 0;
      return total + product.price * quantity;
    }, 0);
    if (Object.entries(quantities).length !== cart.length) {
      setDisabledButton(true)
    }else{
      setDisabledButton(false)
    }
     setTotalPrice(newTotalPrice);   
  }, [cart, quantities]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, event, cantidad) => {
      
    const newValue = parseInt(event.target.value, 10) || 1;

    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newValue
    }));
    
    const index = cart.find((product) => JSON.stringify(product.size) === productId)
     
    if (index) {
      const index2 = objectPago.find((object)=> object.title === index.name)
      if (index2){
        index2.quantity = newValue
      }else{
        setObjectPago(prevObjectPago => [
          ...prevObjectPago,
          {
            title: index.name,
            description: index.description,
            quantity: newValue,
            unit_price: index.price,
            currency_id: 'ARG',
            image: index.img,
            userId: user?.userId,
            productId: index.productId
          }
        ]);
      }
    }
    if (newValue > cantidad || newValue <= 0) {
      setError((prevErrors) => ({
        ...prevErrors,
        [productId]: true,
      }));
      setDisabledButton(true);
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [productId]: false,
      }));
      setDisabledButton(false);
    }
  };
  

  const mercadoPago=()=>{
    console.log("entre al finishPurchase")
    if(user===null){

      const Toast = Swal.mixin({
        toast: "true",
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Primero debes iniciar sesion"
      });

      navigate('/user')
    }
    else{

      dispatch(finishPurchase(objectPago));
    }
  }
 
  return (
    <div className={styles['shopping-cart']}>
      <NavBar />
      <div>
        <h1 className={styles.title}>Carrito de compras</h1>
      </div>
        {cart.length > 0 ? 
      <div className={styles['product-list']}>
        {cart.map(carts => 
          (
            <div key={Object.values(carts.size)} className={styles['cart-item']}>
              <img src={carts.img} alt={carts.name} />
              <div className={styles['product-details']}>
                <h4>{carts.name}</h4>
                <div className={styles.detalles}>
                <p className={styles.price}> <b>Color:</b>  {carts.color}</p>
                <p className={styles.price}> <b>Talla:</b> {Object.keys(carts.size)}</p>
                <div className={styles['cart-controls']}>
                  <div className={styles.quantity} >
                    <b>Cantidad: </b>
                    <div className={styles.numberControl}>
                    <buttom className={styles.numberLeft} onClick={() => handleQuantityChange(JSON.stringify(carts.size), { target: { value: quantities[JSON.stringify(carts.size)] - 1 } }, Object.values(carts.size))}/>
                        <input
                         type='number'
                         className={styles.numberQuantity}
                         name={carts.price}
                         value={quantities[JSON.stringify(carts.size)] }
                         onChange={(e) => handleQuantityChange(JSON.stringify(carts.size), e, Object.values(carts.size))}
                         />
                    <buttom className={styles.numberRight}  onClick={() => handleQuantityChange(JSON.stringify(carts.size), { target: { value: quantities[JSON.stringify(carts.size)] + 1 } }, Object.values(carts.size))} />
                     </div>
                   <p className={error[JSON.stringify(carts.size)] === true ? styles.avisoRed : styles.aviso}> {error[JSON.stringify(carts.size)] === true ? 'Cantidad inválida' : `Cantidad máxima: ${Object.values(carts.size)}` }</p>
                     </div>
                  </div>
                  <p className={styles.price}> <b> Precio unitario: </b>  ${carts.price?.toLocaleString()}</p>
                  <button onClick={()=>handleRemoveFromCart(carts.size)} className={styles.btn}>
                   <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                   <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"/>
                   </svg>
                 </button>
                </div>
                
              </div>
            </div>
          )
        )} 
      </div>
        : <div>
          <h1> CARRITO VACIO</h1> 
           <button onClick={()=>navigate('/')}>SEGUIR COMPRANDO</button>
        </div>}
      <div className={styles.totalPrice}>
        <p>Precio Total: ${totalPrice.toLocaleString()}</p>
      </div>
      <button  onClick={mercadoPago} disabled={disabledButton || Object.values(error).some((errors) => errors) || cart.length < 1} className={styles['checkout-button']}>Finalizar compra</button>
    </div>
  );
}

export default ShoppingCart; 
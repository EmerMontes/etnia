/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './NavBar.module.css';
import Home from '../../assets/png/Home.png';
import Carrito from '../../assets/png/Carrito.png';
import Usuario from '../../assets/png/Usuario.png';
import Configuraciones from '../../assets/png/Configuraciones.png';
import web_analysis_icon from '../../assets/png/web_analysis_icon.png';
import {userLogout, getUserByID, registroTerceros} from "../../redux/actions";

function NavBar(props) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const userLogeado = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const tokenTerceros = user?.sub;
  const emailTerceros = user?.email;


  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate(`/users/${userLogeado.userId}`);
      dispatch(getUserByID(userLogeado.userId));
    } else if (userLogeado) {
      navigate(`/users/${userLogeado.userId}`);
      dispatch(getUserByID(userLogeado.userId));
    } else {
      navigate('/user');
    }
  }

  const tokenObject = { sub: tokenTerceros, email: emailTerceros };

  useEffect(() => {
    console.log('holaaaa desde la navbar');
    console.log(user);
    console.log(tokenObject);
  

    if (tokenTerceros && tokenTerceros.length > 0 && tokenObject) {
      dispatch(registroTerceros(tokenObject));
    }
  }, [dispatch, isAuthenticated, tokenTerceros, tokenTerceros, user]);

  const handleLoginClick = () => {
    navigate('/user');
  };

  const handleLogOut = ()=>{
    dispatch(userLogout());
    localStorage.setItem('initialFilters', {});
    navigate("/");
  }
  
  const UserId = userLogeado?.userId;
  return (
    <div className={styles.navbar}>

      {userLogeado?.userEmail ? (
        <section className={styles.section}>
        <button onClick={()=>handleLogOut()} >🔓</button>
        <button onClick={handleLoginClick}>{userLogeado.userEmail}</button>
        </section>
    ) : (
      <button onClick={handleLoginClick}>
        <img className={styles.Usuario} src={Usuario} alt="Usuario" />
      </button>
    )}

      <button>
        <Link to="/">
          <img className={styles.Home} src={Home} alt="Home" />
        </Link>
      </button>

      <button>
        <Link to="/carrito">
          <img className={styles.Carrito} src={Carrito} alt="Carrito" />
        </Link>
      </button>

      {/* <button onClick={handleUserClick}>
         <img className={styles.Usuario} src={Usuario} alt="Usuario" />
      </button> */}

      <button>
        <Link to="/admin">
          <img src={web_analysis_icon} alt="web_analysis_icon" />
        </Link>
      </button>

      <button>
        <Link to="/favorites">
          <img src="https://www.emojiall.com/images/240/classic/1f5a4.png" />
        </Link>
      </button>

      <button className={ user ? null : styles.none}> 
      {console.log(user)}
         {user && (
           <Link to={`/users/${user.id}`}>
             <img className={styles.Configuraciones} src={Configuraciones} alt="Configuraciones" />
           </Link>
        )}
      </button>

      {/* {userLogeado?.userEmail && 
        <div> <button> <Link to="/favorites"><img src="https://www.emojiall.com/images/240/classic/1f5a4.png" /></Link></button> </div>} */}
    </div>
  );
}

export default NavBar;

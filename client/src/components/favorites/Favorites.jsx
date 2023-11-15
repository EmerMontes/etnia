/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../navBar/NavBar';
import styles from "../card/Card.module.css"
import stylesb from "./Favorites.module.css"
import { getAllFavs, removeFavoriteBack } from '../../redux/actions';
import stylesContainer from "../cardsContainer/CardsContainer.module.css"


export default function Favorites(props){
    const favorites = useSelector((state)=> state.allFavoritesBack);
    const user = useSelector((state)=> state.user);
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
    const loadFavs = ()=>{
         if(user?.userId){
            dispatch(getAllFavs(user.userId));
         }
        }

    useEffect(()=>{
        loadFavs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleFavorite = (id) => {
        dispatch(removeFavoriteBack({UserId: user.userId, ProductId: id}))
     };

    return (
    <div className={stylesb.container}>
        <NavBar/>
        <h2>FAVORITES</h2>
        <div className={stylesContainer['card-container']}>

        {favorites?.length > 0 && favorites?.map(fav => (
            <div key={fav.id} className={styles.card}>
                <button onClick={()=> handleFavorite(fav.id)}>{"❤️"}</button>
                <Link to={`/product/${fav.id}`}>
                    <div>
                        <img src={fav.img} alt={name}/>
                        <h2>{fav.name}</h2>
                        <h2>${fav.price}</h2>
                        {fav.sale > 0 && <h2>{fav.sale}% OFF</h2>}
                        </div>
                        </Link>
                    </div>
        ))}
        </div>
    </div>
)
}
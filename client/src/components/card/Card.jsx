/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react/button-has-type */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Card.module.css';
import { AddFavoriteBack, removeFavoriteBack } from '../../redux/actions';

// comentario de prueba

function Card({id, name, gender, sale, img, color, price}) {
  const favorites = useSelector((state)=> state.allFavoritesBack)
  const user = useSelector((state)=> state.user);

  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      // dispatch(removeFav(id));
      dispatch(removeFavoriteBack({UserId: user.userId, ProductId: id}))
    } else {
      setIsFav(true);
      // dispatch(getAddFavorites(product));
      dispatch(AddFavoriteBack({UserId: user.userId, ProductId: id}))
    }
    console.log(user);
  };

  useEffect(() => {
    if(favorites?.length){
      favorites?.forEach((fav) => {
        if (fav.id === id) {
          setIsFav(true);
        }
      });
    }
  }, [id, favorites]);

  function truncateText(text, maxCharacters) {
    if (text.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  }
  
  return (
    <div>
      <div className={styles.card}>
        {user?.userEmail && 
        <div> <button className={styles.corazon} onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button> </div>}
        <Link to={`/product/${id}`}>
          <div>
            <img className={styles.imagen} src={img} alt={name} />
            <div className={styles.descripcion}>
              <h2 className={styles.name}>{truncateText(name, 15)}</h2>
              <h2 className={styles.price}>{`$${price.toLocaleString()} COP`}</h2>
              {sale > 0 && <h2 className={styles.discount}>{`${sale}% OFF`}</h2>}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;

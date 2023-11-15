import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './reviews.module.css';
import { createReview, updateReview, deleteReview, getAllReviews } from '../../redux/actions';



const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  const [newReview, setNewReview] = useState({
    calification: 1,
    review: '', 
  });

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const handleCreateReview = () => {
    // Verificar que la calificación esté entre 1 y 5
    if (newReview.calification >= 1 && newReview.calification <= 5) {
      dispatch(createReview(newReview));
      setNewReview({
        calification: 1,
        review: '',
      });
    } else {
      alert('La calificación debe estar entre 1 y 5');
    }
  };

  const handleUpdateReview = (id) => {
    const updatedReview = {
      id,
      calification: 3, // se puede obtener el valor del input o usar otro método para obtener la nueva calificación
      review: 'Nuevo texto de revisión', // se puede obtener el valor del input o usar otro método para obtener la nueva revisión
    };
    dispatch(updateReview(updatedReview));
  };

  const handleDeleteReview = (id) => {
    dispatch(deleteReview(id));
  };

  return (
    <div className={styles.container}>
    <h1>Lista de Revisiones</h1>
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          Calificación: {review.calification}, Revisión: {review.review}{' '}
          <button type="button" onClick={() => handleUpdateReview(review.id)}>Actualizar</button>{' '}
          <button type="button" onClick={() => handleDeleteReview(review.id)}>Eliminar</button>
        </li>
      ))}
    </ul>

    <h2>Crear Nueva Revisión</h2>
    <div className={styles.formContainer}>
      <label htmlFor="calificationInput">
        Calificación:
        <input
          type="number"
          min="1"
          max="5"
          value={newReview.calification}
          onChange={(e) => setNewReview({ ...newReview, calification: parseInt(e.target.value, 10) })}
        />
      </label>
      <label htmlFor="reviewTextArea">
        Revisión:
        <textarea
          value={newReview.review}
          onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
        />
      </label>
      <button type="button" onClick={handleCreateReview}>Crear Revisión</button>
    </div>
  </div>
);
};

export default Reviews;


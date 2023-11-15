/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header/Header';
import CardContainer from '../../components/cardsContainer/CardsContainer';
import NavBar from '../../components/navBar/NavBar';
import Filters from '../../components/filters/Filters';
import {getAllFavs, getAllSelects, getFiltersAndPagination } from '../../redux/actions';

import styles from './Home.module.css';
import { useLocalStorage } from '../../functions/useLocalStorage';
import resetView from '../home/clockwise.svg';

function Home(props) {
  const Page = useSelector((state) => state.indexProductShow);
  const user = useSelector((state)=> state.user);
  const userState = useSelector((state) => state.user) || {};
  const { token, userEmail, userId } = userState;
  const selects = useSelector ((state) => state.selectFilter)
  const [initialPageSet, setInitialPageSet] = useState(1);
  const [initialFilters, setInitialFilters] = useLocalStorage('initialFilters', {});
  const maxPages = Math.ceil(Page?.info?.total / 10);
  const currentPage = Page?.info?.page;

  const dispatch = useDispatch();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
  const loadFavs = ()=>{
    if(user?.userId){
       dispatch(getAllFavs(user.userId));
    }
   }

  useEffect(() => {
    if (!initialPageSet) {
      dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
      setInitialPageSet(true);
    }
  }, [initialPageSet, dispatch]);

  const loadProducts = async () => {
    if (!Page.length) {
      await dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
    }
  };

  useEffect(() => {
    loadProducts();
    dispatch(getAllSelects());
    loadFavs();
    console.log(user);
  }, [dispatch, initialFilters, initialPageSet]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialFilters({ ...initialFilters, [name]: value });
    setInitialPageSet(1);
    dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
  };

  const handleFilterRemove = (filterName) => {
    const newInitialFilters = { ...initialFilters };
    delete newInitialFilters[filterName];
    setInitialFilters(newInitialFilters);
    dispatch(getFiltersAndPagination(newInitialFilters, 1));
  };

  const genderOpt = ['male', 'female'];
  const categoryOpt = selects.category;
  const colorOpt = selects.color;
  const saleOpt = ['sale', 'no-sale'];
  const sizeOpt = selects.size;
  const PriceOpt = ['highest', 'lowest'];

  function Pagination() {
    const dispatch = useDispatch();
    const totalPages =  maxPages || 5;
    const currentPage = Page?.info?.page || 1;
  
    const handlePageClick = (pageNumber) => {
      setInitialPageSet(pageNumber);
      dispatch(getFiltersAndPagination(initialFilters, pageNumber));
    };
  
    const handlePreviousClick = () => {
      if (currentPage > 1) {
        handlePageClick(currentPage - 1);
      }
    };
  
    const handleNextClick = () => {
      if (currentPage < totalPages) {
        handlePageClick(currentPage + 1);
      }
    };
  
    const renderPageNumbers = () => {
      const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
      return (
        <button className={styles.numberIndexPage}>
          {pageNumbers.map((pageNumber) => (
            <span
              key={pageNumber}
              className={`${styles.paginationNumber} ${currentPage === pageNumber && styles.paginationActual}`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </span>
          ))}
        </button>
      );
    };
  
    return (
      <div className={styles.paginationcontainer}>
        <button
          className={`${styles.paginationbutton} ${currentPage === 1 && styles.paginationcurrent}`}
          onClick={handlePreviousClick}
        >
          {"<"}
        </button>
        {renderPageNumbers()}
        <button
          className={`${styles.paginationbutton} ${currentPage === totalPages && styles.paginationcurrent}`}
          onClick={handleNextClick}
        >
          {">"}
        </button>
      </div>
    );
  }

  useEffect(() => {
    console.log(Page?.info?.total);
  }, [handleChange]);
  const textPaginado = `${currentPage} of ${maxPages}`;

  return (
    <div className={styles.home}>
      <Header
        initialFilters={initialFilters}
        setInitialFilters={setInitialFilters}
        initialPageSet={initialPageSet}
        setInitialPageSet={setInitialPageSet}
      />
      <NavBar />
      <div className={styles.filterscontainer}>
        <Filters
          className={styles.filters}
          name="gender"
          options={genderOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          className={styles.filters}
          name="category"
          options={categoryOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          className={styles.filters}
          name="color"
          options={colorOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          className={styles.filters}
          name="sale"
          options={saleOpt}
          handleChange={handleChange}
          state={null}
        />
        {/* <Filters
          className={styles.filters}
          name={"size"}
          options={sizeOpt}
          handleChange={handleChange}
          state={null}
        /> */}
        <Filters
          className="filters"
          name="price"
          options={PriceOpt}
          handleChange={handleChange}
          state={null}
        />
        <button
          className={styles.button}
          onClick={() => {
            setInitialPageSet(1); // Reiniciar a la página 1 cuando se hace clic en el botón de reset
            dispatch(getFiltersAndPagination({}, 1));
            setInitialFilters({});
          }}
        >
          <img className={styles.reset} src={resetView} />
        </button>
      </div>
      <div>
        {initialFilters?.gender && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('gender')}>
            {initialFilters.gender}
          </div>
        )}
        {initialFilters?.category && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('category')}>
            {initialFilters.category}
          </div>
        )}
        {initialFilters?.color && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('color')}>
            {initialFilters.color}
          </div>
        )}
        {initialFilters?.sale && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('sale')}>
            {initialFilters.sale}
          </div>
        )}
        {initialFilters?.size && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('size')}>
            {initialFilters.size}
          </div>
        )}
        {initialFilters?.price && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('price')}>
            {initialFilters.price}
          </div>
        )}
      </div>

      <CardContainer products={Page} />
      <br />
      <br />
      <Pagination textPaginado={textPaginado} />
      {maxPages?.length > 0 && <p className={styles.textPaginado}>{textPaginado}</p>}
    </div>
  );
}

export default Home;

/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable unused-imports/no-unused-imports */
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

import styles from './SearchBar.module.css';
import Lupa from '../../assets/png/Lupa.png';
import { getFiltersAndPagination } from '../../redux/actions';

function SearchBar({initialFilters, setInitialFilters, initialPageSet, setInitialPageSet}) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    setName('');
  };

  const handleChange = (event) => {
    setName(event.target.value);
    setInitialFilters({ ...initialFilters, name });
    setInitialPageSet(1);
    dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
  };

  return (
    <div className={styles.searchbar}>
      <input
        type="search"
        onChange={handleChange}
        value={name}
        placeholder="Search for a product..."
      />
      <button onClick={handleSearch}>
        <img className={styles.Lupa} src={Lupa} alt="Search" />
      </button>
    </div>
  );
}

export default SearchBar;

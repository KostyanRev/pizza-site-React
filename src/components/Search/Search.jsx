import React from 'react';

import style from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={style.root}>
      <svg
        className={style.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={style.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <svg
          onClick={() => setSearchValue('')}
          className={style.clearIcon}
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;

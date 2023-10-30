import React, { useContext, useEffect, useState } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBLock from '../components/PizzaBlock/PizzaBLock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../App';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { useRef } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sort, orderType, currentPage } = useSelector(
    (state) => state.filter
  );
  const { searchValue } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';

    try {
      axios
        .get(
          `https://6537b126a543859d1bb0a6b5.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort.sortProperty}&order=${orderType}`
        )
        .then(({ data }) => {
          setItems(data);
          setIsLoading(false);
        });
    } catch (error) {
      alert('Failed to download pizzas:(');
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, currentPage, orderType]);

  const pizzas = items
    .filter((item) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBLock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

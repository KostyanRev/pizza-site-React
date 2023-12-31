import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBLock from '../components/PizzaBlock/PizzaBLock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { SearchPizzaParams } from '../redux/pizza/types';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, orderType, currentPage, searchValue } =
    useSelector(selectFilter);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sort.sortProperty;

    dispatch(
      fetchPizzas({
        orderType,
        category,
        sortBy,
        currentPage,
      })
    );

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
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: '',
          categoryId: Number(params.category),
          currentPage: params.currentPage,
          orderType: params.orderType,
          sort: sort || list[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, currentPage, orderType]);

  const pizzas = items
    .filter((item: any) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBLock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} orderType={orderType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка😕</h2>
          <p>
            К сожалению не удалось получить питсы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

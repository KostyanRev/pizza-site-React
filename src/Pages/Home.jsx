import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBLock from '../components/PizzaBlock/PizzaBLock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../Pagination/Pagination';
import { AppContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { searchValue } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    try {
      axios
        .get(
          `https://6537b126a543859d1bb0a6b5.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort.sortProperty}&order=desc`
        )
        .then(({ data }) => {
          setItems(data);
          setIsLoading(false);
        });
    } catch (error) {
      alert('Failed to download pizzas:(');
    }
    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage]);

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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;

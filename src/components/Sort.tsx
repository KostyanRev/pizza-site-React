import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSortType, setOrderType } from '../redux/filter/slice';
import { SortPropertyEnum, Sort, Order } from '../redux/filter/types';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortPopupProps = {
  value: Sort;
  orderType: Order;
};

export const list: SortItem[] = [
  { name: 'популярности', sortProperty: SortPropertyEnum.RATING },
  { name: 'цене', sortProperty: SortPropertyEnum.PRICE },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE },
];

const SortPopup: React.FC<SortPopupProps> = memo(({ value, orderType }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        {orderType === 'desc' ? (
          <svg
            onClick={() => dispatch(setOrderType('asc'))}
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            version="1.1"
            viewBox="0 0 20 20"
            width="20">
            <g id="layer1">
              <path d="M 3 0 L 3 18 L 0 15 L 0 16.5 L 3.5 20 L 7 16.5 L 7 15 L 4 18 L 4 0 L 3 0 z M 7 2 L 7 3 L 20 3 L 20 2 L 7 2 z M 7 6 L 7 7 L 15 7 L 15 6 L 7 6 z M 7 10 L 7 11 L 11 11 L 11 10 L 7 10 z " />
            </g>
          </svg>
        ) : (
          <svg
            onClick={() => dispatch(setOrderType('desc'))}
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            version="1.1"
            viewBox="0 0 20 20"
            width="20">
            <g id="layer1">
              <path d="M 3.5 0 L 0 3.5 L 0 5 L 3 2 L 3 20 L 4 20 L 4 2 L 7 5 L 7 3.5 L 3.5 0 z M 7 9 L 7 10 L 20 10 L 20 9 L 7 9 z M 7 13 L 7 14 L 15 14 L 15 13 L 7 13 z M 7 17 L 7 18 L 11 18 L 11 17 L 7 17 z " />
            </g>
          </svg>
        )}

        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => onClickListItem(obj)}
                  className={
                    value.sortProperty === obj.sortProperty ? 'active' : ''
                  }>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;

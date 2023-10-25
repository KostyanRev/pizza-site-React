import React from 'react';

const Categories = ({ value, onChangeCategory }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, idx) => {
          return (
            <li
              key={idx}
              onClick={() => onChangeCategory(idx)}
              className={value === idx ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

import React, { FC } from 'react';

interface ICategoriesProps {
  value: number;
  onChangeCategory: (i: number) => void;
}

const Categories: FC<ICategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => onChangeCategory(i)}
            className={value === i ? 'active' : ' '}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

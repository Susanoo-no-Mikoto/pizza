import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//ReduxSlices
import { filterSelector, setCategoryId } from '../redux/slices/filterSlice';

const Categories: FC = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const dispatch = useDispatch();
  const { categoryId } = useSelector(filterSelector);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? 'active' : ' '}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

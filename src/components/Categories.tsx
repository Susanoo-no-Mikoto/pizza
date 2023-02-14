import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//ReduxSlices
import { setCategoryId } from '../redux/slices/filterSlice';

//Types
import { RootState } from '../redux/store';

interface ICategoriesProps {
  value: number;
  onChangeCategory: (i: number) => void;
}

const Categories: FC = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const dispatch = useDispatch();
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);

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

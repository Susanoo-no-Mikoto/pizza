import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//ReduxSlices
import { addPizza, cartItemsByIdSelector } from '../../redux/slices/cartSlice';

interface IPizzaBlockProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  category: number;
  types: number[];
  sizes: number[];
  rating: number;
}

const PizzaBlock: FC<IPizzaBlockProps> = ({ id, title, imageUrl, price, types, sizes }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsByIdSelector(id));

  const [activeType, setActiveType] = useState<number>(0);
  const [acticeSize, setActiceSize] = useState<number>(0);

  const addedCount = cartItems ? cartItems.count : 0;
  const typesNames = ['тонкое', 'традиционное'];

  const onClickAdd = () => {
    const item = {
      id,
      title,
      imageUrl,
      price,
      type: typesNames[activeType],
      size: sizes[acticeSize],
    };
    dispatch(addPizza(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typesNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                onClick={() => setActiceSize(index)}
                className={acticeSize === index ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;

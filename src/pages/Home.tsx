import { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from '../components/Search';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export interface IItem {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  category: number;
  types: number[];
  sizes: number[];
  rating: number;
}

const Home = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [sort, setSort] = useState({ name: 'популярности ↓', sortProperty: 'rating' });

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

    (async () => {
      try {
        const [itemsResponse] = await Promise.all([
          axios.get<IItem[]>(
            `http://localhost:3001/items?${category}&_sort=${sortBy}&_order=${order}`,
          ),
        ]);

        setItems(itemsResponse.data);
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка загрузки данных');
        console.log(error);
      }
    })();
    window.scrollTo(0, 0);
  }, [categoryId, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort sort={sort} onChangeSort={(obj) => setSort(obj)} />
      </div>
      <div className="title__search__wrapper">
        <h2 className="content__title">Все пиццы</h2>
        <Search />
      </div>

      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;

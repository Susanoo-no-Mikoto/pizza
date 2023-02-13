import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from '../components/Search';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

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

interface IHomeProps {
  searshValue: string;
}

const Home: FC<IHomeProps> = ({ searshValue }) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState({ name: 'популярности ↓', sortProperty: 'rating' });

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searshValue ? `&title_like=${searshValue}` : '';

    (async () => {
      try {
        const [itemsResponse] = await Promise.all([
          axios.get<IItem[]>(
            `http://localhost:3001/items?_page=${currentPage}&_limit=8&${category}&_sort=${sortBy}&_order=${order}${search}`,
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
  }, [categoryId, sort, searshValue, currentPage]);

  const pizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searshValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort sort={sort} onChangeSort={(obj) => setSort(obj)} />
      </div>
      <div className="title__search__wrapper">
        <h2 className="content__title">Все пиццы</h2>
        {/* <Search /> */}
      </div>

      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onPageChange={(numPage: number) => setCurrentPage(numPage)} />
    </div>
  );
};

export default Home;

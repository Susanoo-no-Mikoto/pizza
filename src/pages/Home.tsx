import { FC, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

//ReduxSlices
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';

//Components
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Search from '../components/Search';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

//Types
import { RootState } from '../redux/store';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state: RootState) => state.filter);
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangePage = (numPage: number) => {
    dispatch(setCurrentPage(numPage));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searshValue ? `&title_like=${searshValue}` : '';

    (async () => {
      try {
        // const [itemsResponse] = await Promise.all([
        // ]);
        await axios
          .get<IItem[]>(
            `http://localhost:3001/items?_page=${currentPage}&_limit=8&${category}&_sort=${sortBy}&_order=${order}${search}`,
          )
          .then((res) => {
            setItems(res.data);
            setIsLoading(false);
          });
      } catch (error) {
        alert('Ошибка загрузки данных');
        console.log(error);
      }
    })();
  };

  // Если изменили параметры и был первый рендер
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

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searshValue, currentPage]);

  const pizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searshValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="title__search__wrapper">
        <h2 className="content__title">Все пиццы</h2>
        {/* <Search /> */}
      </div>

      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

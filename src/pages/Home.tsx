import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

//Redux toolkit
import { filterSelector, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzasSlice';

//Components
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Search from '../components/Search';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaSelector);
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const onChangePage = (numPage: number) => {
    dispatch(setCurrentPage(numPage));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&title_like=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      }),
    );
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
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка!😕</h2>
          <p>Не удалось получить пиццы!</p>
        </div>
      ) : (
        <>
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
      )}
    </div>
  );
};

export default Home;

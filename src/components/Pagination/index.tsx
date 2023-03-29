import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface IPaginationProps {
  currentPage: number;
  onChangePage: (numPage: number) => void;
}
const Pagination: FC<IPaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={4}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;

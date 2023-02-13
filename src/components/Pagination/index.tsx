import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface IPaginationProps {
  onPageChange: (numPage: number) => void;
}

const Pagination: FC<IPaginationProps> = ({ onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={4}
    />
  );
};

export default Pagination;

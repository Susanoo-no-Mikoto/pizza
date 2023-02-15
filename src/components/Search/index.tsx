import { FC, useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

interface ISearhProps {
  searshValue: string;
  setSearshValue: (value: string) => void;
}

const Search: FC = () => {
  const { setSearshValue } = useContext(SearchContext);
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setSearshValue('');
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearshValue(str);
    }, 500),
    [],
  );

  const onChangeInput = (event: { target: HTMLInputElement }) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon__search}
        xmlns="http://www.w3.org/2000/svg"
        height="32px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 32 32"
        width="32px">
        <g id="search_1_">
          <path
            d="M20,0.005c-6.627,0-12,5.373-12,12c0,2.026,0.507,3.933,1.395,5.608l-8.344,8.342l0.007,0.006   C0.406,26.602,0,27.49,0,28.477c0,1.949,1.58,3.529,3.529,3.529c0.985,0,1.874-0.406,2.515-1.059l-0.002-0.002l8.341-8.34   c1.676,0.891,3.586,1.4,5.617,1.4c6.627,0,12-5.373,12-12C32,5.378,26.627,0.005,20,0.005z M4.795,29.697   c-0.322,0.334-0.768,0.543-1.266,0.543c-0.975,0-1.765-0.789-1.765-1.764c0-0.498,0.21-0.943,0.543-1.266l-0.009-0.008l8.066-8.066   c0.705,0.951,1.545,1.791,2.494,2.498L4.795,29.697z M20,22.006c-5.522,0-10-4.479-10-10c0-5.522,4.478-10,10-10   c5.521,0,10,4.478,10,10C30,17.527,25.521,22.006,20,22.006z"
            fill="#333333"
          />
          <path
            d="M20,5.005c-3.867,0-7,3.134-7,7c0,0.276,0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5c0-3.313,2.686-6,6-6   c0.275,0,0.5-0.224,0.5-0.5S20.275,5.005,20,5.005z"
            fill="#333333"
          />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.icon__close}
          xmlns="http://www.w3.org/2000/svg"
          data-name="Livello 1"
          id="Livello_1"
          viewBox="0 0 128 128">
          <title />
          <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
          <path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;

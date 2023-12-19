import React, { ChangeEvent } from 'react'
import styles from './Search.module.scss'
import { BiSearch } from 'react-icons/bi';

interface ISearchProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({value, onChange}: ISearchProps) => {
  return (
    <div className={styles.search}>
        <BiSearch
            size={18}
            className={styles.icon}
        />
        <input
            type="text" 
            placeholder='찾고 싶은 상품을 검색하세요.'
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export default Search
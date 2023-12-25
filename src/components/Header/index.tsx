import Input from '../Input';

import styles from "./styles.module.scss";
import Select from '../Select';
import { TTodoFilterTpye } from '../../store/slices/todoSlice/types';
import { useDispatch } from 'react-redux';
import { filterTodo, setSearchText } from '../../store/slices/todoSlice';
import { OPTIONS } from './constants';
import { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { ETheme } from '../../types/theme';
import useHeader from './useHeader';


const Header = () => {
    const [searchedText, setSearchedText] = useState<string>('');

    const { theme, setTheme } = useTheme();
    const { searchIcon, themeToggleIcon, headerTitleClasses, } = useHeader();

    const dispatch = useDispatch();
    
    const handleFilterChange = (filter: TTodoFilterTpye) => {
      dispatch(filterTodo(filter));
    };

    const handleFindTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = e.target.value;
      setSearchedText(searchText);
      dispatch(setSearchText(searchText));
    }

    const toggleTheme = () => {
      const newTheme = theme === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT;
      setTheme(newTheme);
    };

    return (
        <form className={styles.Header}>
           <div className={headerTitleClasses}>TODO LIST</div> 
           <div className={styles.inputWrapper}>
             <Input 
              value={searchedText} 
              onChange={handleFindTodo} 
              icon={searchIcon} 
              placeholder="Search note..." 
             />
            <div className={styles.searchControllers}>
            <Select options={OPTIONS} onSelect={handleFilterChange as any} className={styles.headerSelect} />
             <img 
              src={themeToggleIcon} 
              alt="Moon" 
              width={36} 
              height={36} 
              className={styles.themeIcon} 
              onClick={toggleTheme}
             />
            </div>
           </div>
        </form>
    );
}

export default Header;
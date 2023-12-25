// Select.tsx
import React, { useState } from 'react';

import { ISelectProps } from './types';

import styles from "./styles.module.scss";
import classNames from '../../utilities/classNames';

const Select: React.FC<ISelectProps<string>> = (props) => {
  const { onSelect, options, className, ...otherProps } = props;  

  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    onSelect(selectedOption);
  };

  return (
    <select
     value={selectedValue}
     onChange={handleSelectChange}
     className={classNames(styles.Select, className)}
     {...otherProps}
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

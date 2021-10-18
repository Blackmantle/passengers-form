import React from 'react';
import { Select } from './styled';
import FieldLabel from '../FieldLabel';
import FormErrorText from '../FormErrorText';

const SelectComp = ({ value, onChange, label, isRequired, error, children, ...rest }, ref) => (
  <FieldLabel value={label} isRequired={isRequired}>
    <Select
      {...rest}
      ref={ref}
      value={value}
      onChange={onChange}
      error={error}
    >
      {children}
    </Select>
    {error && <FormErrorText>{error}</FormErrorText>}
  </FieldLabel>
);

export default React.forwardRef(SelectComp);
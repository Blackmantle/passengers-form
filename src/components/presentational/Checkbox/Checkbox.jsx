import React from 'react';
import { Label, Checkbox } from './styled';
import FieldLabel from '../FieldLabel';

const CheckboxComp = ({ value, onChange, label, isRequired, ...rest }, ref) => (
  <FieldLabel as={Label} value={label} isRequired={isRequired}>
    <Checkbox
      {...rest}
      ref={ref}
      value={value}
      onChange={onChange}
    />
  </FieldLabel>
);

export default React.forwardRef(CheckboxComp);
import React from 'react';
import { Input } from './styled';
import FieldLabel from '../FieldLabel';
import FormErrorText from '../FormErrorText';

const TextInput = ({ value, onChange, label, isRequired, error, ...rest }, ref) => (
  <FieldLabel value={label} isRequired={isRequired}>
    <Input
      {...rest}
      ref={ref}
      value={value}
      onChange={onChange}
      error={error}
    />
    {error && <FormErrorText>{error}</FormErrorText>}
  </FieldLabel>
);

export default React.forwardRef(TextInput);
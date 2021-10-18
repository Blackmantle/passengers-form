import React from 'react';
import { Label, Text, Icon } from './styled';

const FieldLabel = ({ value, isRequired, children, ...rest }) => (
  <Label {...rest}>
    <Text>{value}{isRequired && <Icon>&#128958;</Icon>}</Text>
    {children}
  </Label>
);

export default FieldLabel;
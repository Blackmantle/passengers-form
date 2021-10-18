import styled from 'styled-components';
import { Label as FieldLabel } from '../FieldLabel/styled';

export const Label = styled(FieldLabel)`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  & > *:first-child {
    order: 1;
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  transform: scale(1.2);
  cursor: pointer;
`;
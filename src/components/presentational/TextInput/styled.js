import styled from 'styled-components';
import { lighten } from 'polished';

export const Input = styled.input`
  width: 100%;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid ${props => props.error ? 'red' : 'silver'};
  background: ${props => props.error ? lighten(0.47, 'red') : 'white'};
  border-radius: 4px;
  &:disabled {
    background: lavender;
    cursor: not-allowed;
  }
`;
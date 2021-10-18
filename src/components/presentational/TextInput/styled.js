import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid ${props => props.error ? 'red' : 'silver'};
  border-radius: 4px;
  &:disabled {
    background: lavender;
    cursor: not-allowed;
  }
`;
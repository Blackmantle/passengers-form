import styled from 'styled-components';
import { Fieldset } from '../PassengerFieldset/styled';

export const Form = styled.form`
  margin-top: 20px;
  & > ${Fieldset}:not(:first-child) {
    margin-top: 30px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  @media (max-width: 500px) {
    flex-direction: column;
    & > *:not(:first-child) {
      margin-top: 20px;
    }
  }
`;
import styled from 'styled-components';

export const Fieldset = styled.fieldset`
  position: relative;
  padding: 20px;
  border: 2px solid red;
  border-radius: 4px;
`;

export const Legend = styled.legend`
  padding: 0 10px;
  font-size: 20px;
  font-weight: bold;
  color: red;
`;

export const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));
  grid-gap: 20px;
  margin: 20px 0;
  & > * {
    width: auto !important;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr))
  }
`;

export const DeleteButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  top: -34px;
`;

export const EmergencyDesc = styled.p`
  margin: 15px 0;
`;
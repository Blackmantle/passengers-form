import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const StartIcon = styled.div`
  margin-right: 8px;
`;

export const EndIcon = styled.div`
  margin-left: 8px;
`;

export const Text = styled.span``;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  ${props => props.removeTextOnMobile && `
    @media (max-width: 500px) {
      ${Text} {
        display: none;
      }
      ${StartIcon}, ${EndIcon} {
        margin: 0;
      }
    }
  `};
`;

export const Contained = styled(Button)`
  color: white;
  background: red;
  &:hover {
    background: ${darken(0.1, 'red')};
  }
`;

export const Outlined = styled(Button)`
  color: red;
  background: white;
  border: 2px solid red;
  &:hover {
    background: ${lighten(0.45, 'red')};
  }
`;
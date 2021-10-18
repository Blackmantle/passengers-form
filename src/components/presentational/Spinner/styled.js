import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Spinner = styled(FontAwesomeIcon).attrs({ icon: faSpinner, size: 'lg' })`
  animation: spin infinite 1.5s linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
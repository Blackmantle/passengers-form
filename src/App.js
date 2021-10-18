import React from 'react';
import { Wrapper, Container } from './styled';
import PassengersForm from 'components/container/PassengersForm';

function App() {
  return (
    <Wrapper>
      <Container>
        <h2>Данные пассажиров</h2>
        <PassengersForm />
      </Container>
    </Wrapper>
  );
}

export default App;

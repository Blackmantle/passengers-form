import React from 'react';
import { Container } from './styled';
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import NumberFormat from 'react-number-format';
import TextInput from '../TextInput';

registerLocale('ru', ru);
setDefaultLocale('ru');

const DateInput = ({ value, onChange, label, isRequired, error, ...rest }, ref) => (
  <Container>
    <DatePicker
      {...rest}
      ref={ref}
      selected={value}
      onChange={onChange}
      customInput={
        <NumberFormat
          customInput={TextInput}
          label={label}
          error={error}
          isRequired={isRequired}
          format="##.##.####"
          mask="_"
        />
      }
      placeholderText="__.__.____"
      dateFormat="dd.MM.yyyy"
      minDate={new Date(1900, 0, 1)}
      maxDate={Date.now()}
      dropdownMode="select"
      showMonthDropdown
      showYearDropdown
    />
  </Container>
);

export default React.forwardRef(DateInput);
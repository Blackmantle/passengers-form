import React from 'react';
import axios from 'axios';
import { Form, ButtonsContainer } from './styled';
import { useForm, useFieldArray } from 'react-hook-form';
import PassengerFieldset from '../PassengerFieldset';
import Button from '../../presentational/Button';
import Spinner from '../../presentational/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// https://webhook.site/#!/c4f474c0-2fc8-456c-ad20-9d3e6ccf6d09
const API_URL = 'https://webhook.site/c4f474c0-2fc8-456c-ad20-9d3e6ccf6d09';

const initPassengerData = {
  name: '',
  surname: '',
  middlename: '',
  gender: '',
  birthDate: '',
  nationality: 'RU',
  documentType: 'passport-RU',
  documentNumber: '',
  tariff: '',
  SNILS: '',
  tel: '',
  email: '',
  isFSS: false,
  emergencyNotifications: false,
};

const PassengersForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: {
      isSubmitting,
      errors,
    },
    watch,
    trigger,
  } = useForm({
    defaultValues: { passengers: [initPassengerData] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "passengers" });

  const onSubmit = (data) => axios.post(API_URL, data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, id) => (
        <PassengerFieldset
          key={item.id}
          id={id}
          register={register}
          control={control}
          remove={remove}
          watch={watch}
          trigger={trigger}
          passengersAmount={fields.length}
          errors={errors.passengers?.[id]}
        />
      ))}
      <ButtonsContainer>
        <Button
          type="button"
          startIcon={<FontAwesomeIcon icon={faPlusSquare} size="lg" />}
          onClick={() => append(initPassengerData)}
          outlined
        >
          Добавить пассажира
        </Button>
        <Button endIcon={isSubmitting && <Spinner />}>Отправить</Button>
      </ButtonsContainer>
    </Form>
  );
};

export default PassengersForm;
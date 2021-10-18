import React from 'react';
import {
  Fieldset,
  Legend,
  ThreePerRow,
  TwoPerRow,
  OnePerRow,
  DeleteButtonContainer,
  EmergencyDesc,
} from './styled';
import countries from "i18n-iso-countries";
import russian from "i18n-iso-countries/langs/ru.json";
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import Checkbox from '../../presentational/Checkbox';
import TextInput from '../../presentational/TextInput';
import Select from '../../presentational/Select';
import DateInput from '../../presentational/DateInput';
import Button from '../../presentational/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

countries.registerLocale(russian);

const PassengerFieldset = ({ id, passengersAmount, register, control, remove, watch, errors }) => {
  const isFSS = watch(`passengers.${id}.isFSS`);
  const hasEmergencyNotifications = watch(`passengers.${id}.emergencyNotifications`);
  const sharedValidators = { required: 'Обязательное поле' };
  const dependentValidators = {
    ...sharedValidators,
    required: !isFSS && sharedValidators.required,
  };
  return (
    <Fieldset>
      <Legend>Пассажир №{id+1}</Legend>
      {passengersAmount > 1 && (
        <DeleteButtonContainer>
          <Button
            type="button"
            startIcon={<FontAwesomeIcon icon={faMinusSquare} size="lg" />}
            onClick={() => remove(id)}
            removeTextOnMobile
            outlined
          >
            Удалить пассажира
          </Button>
        </DeleteButtonContainer>
      )}
      <div>
        <Checkbox
          {...register(`passengers.${id}.isFSS`)}
          label="Оформление билета по ФСС"
        />
        {isFSS && (
          <OnePerRow>
            <Controller
              control={control}
              name={`passengers.${id}.SNILS`}
              render={({ field: { value, onChange } }) => (
                <NumberFormat
                  value={value}
                  onValueChange={({ value }) => onChange(value)}
                  label="СНИЛС"
                  error={errors?.SNILS?.message}
                  customInput={TextInput}
                  placeholder="___-___-___ __"
                  format="###-###-### ##"
                  mask="_"
                  isNumericString
                  isRequired
                />
              )}
              rules={{
                ...sharedValidators,
                minLength: {
                  value: 11,
                  message: "Минимум 11 цифр",
                },
              }}
              shouldUnregister
            />
            <div/><div/>
          </OnePerRow>
        )}
      </div>
      <ThreePerRow>
        <TextInput
          {...register(`passengers.${id}.surname`, dependentValidators)}
          label="Фамилия"
          error={errors?.surname?.message}
          disabled={isFSS}
          isRequired
        />
        <TextInput
          {...register(`passengers.${id}.name`, dependentValidators)}
          label="Имя"
          error={errors?.name?.message}
          disabled={isFSS}
          isRequired
        />
        <TextInput
          {...register(`passengers.${id}.middlename`)}
          label="Отчество (обязательно, при наличии)"
          disabled={isFSS}
        />
        <Select
          {...register(`passengers.${id}.gender`, dependentValidators)}
          label="Пол"
          error={errors?.gender?.message}
          disabled={isFSS}
          isRequired
        >
          <option value="">Не выбрано</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </Select>
        <Controller
          control={control}
          name={`passengers.${id}.birthDate`}
          render={({ field: { value, onChange } }) => (
            <DateInput
              value={value}
              onChange={onChange}
              label="Дата рождения"
              error={errors?.birthDate?.message}
              disabled={isFSS}
              isRequired={!isFSS}
            />
          )}
          rules={dependentValidators}
          shouldUnregister
        />
        <Select
          {...register(`passengers.${id}.nationality`, sharedValidators)}
          label="Гражданство"
          error={errors?.nationality?.message}
          isRequired
        >
          {Object.entries(countries.getNames("ru")).map(([value, label], id) => (
            <option key={id} value={value}>{label}</option>
          ))}
        </Select>
        <Select
          {...register(`passengers.${id}.documentType`, sharedValidators)}
          label="Тип документа"
          error={errors?.documentType?.message}
          isRequired
        >
          <option value="passport-RU">Паспорт РФ</option>
          <option value="militaryID">Военный билет</option>
          <option value="intPassport">Заграничный паспорт</option>
          <option value="birthСertificate">Свидетельство о рождении</option>
        </Select>
        <TextInput
          {...register(`passengers.${id}.documentNumber`, sharedValidators)}
          label="Номер документа"
          error={errors?.documentNumber?.message}
          isRequired
        />
        <Select
          {...register(`passengers.${id}.tariff`, sharedValidators)}
          label="Тариф"
          error={errors?.tariff?.message}
          isRequired
        >
          <option value="">Не выбрано</option>
          <option value="child">Детский</option>
          <option value="default">Обычный</option>
          <option value="premium">Премиум</option>
        </Select>
      </ThreePerRow>
      <div>
        <Checkbox
          {...register(`passengers.${id}.emergencyNotifications`)}
          label="Согласен на получение оповещений в случаях чрезвычайных ситуаций на железнодорожном транспорте"
        />
        <EmergencyDesc>
          В соответствии с п.7 Правил перевозок пассажиров, багажа, грузобагажа железнодорожным
          транспортом при покупке билета необходимо указать свои контактные данные.
        </EmergencyDesc>
        {hasEmergencyNotifications && (
          <TwoPerRow>
            <Controller
              control={control}
              name={`passengers.${id}.tel`}
              render={({ field: { value, onChange } }) => (
                <NumberFormat
                  value={value}
                  onValueChange={({ value }) => onChange(value)}
                  format="+7 (###) ###-##-##"
                  mask="_"
                  customInput={TextInput}
                  label="Телефон пассажира"
                  error={errors?.tel?.message}
                  allowEmptyFormatting
                  isNumericString
                  isRequired
                />
              )}
              rules={{
                ...sharedValidators,
                minLength: {
                  value: 10,
                  message: "Минимум 10 цифр",
                },
              }}
              shouldUnregister
            />
            <TextInput
              {...register(`passengers.${id}.email`, sharedValidators)}
              type="email"
              label="E-mail пассажира"
              error={errors?.email?.message}
              isRequired
            />
            <div/>
          </TwoPerRow>
        )}
      </div>
    </Fieldset>
  );
};

export default PassengerFieldset;
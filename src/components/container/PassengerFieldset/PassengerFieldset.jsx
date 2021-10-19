import React, { useEffect } from 'react';
import {
  Fieldset,
  Legend,
  FieldsContainer,
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

const PassengerFieldset = ({
  id,
  passengersAmount,
  register,
  control,
  remove,
  watch,
  trigger,
  errors,
}) => {
  const passenger = `passengers.${id}`;
  const isFSS = watch(`${passenger}.isFSS`);
  const hasEmergencyNotifications = watch(`${passenger}.emergencyNotifications`);
  const sharedValidators = { required: 'Обязательное поле' };
  const dependentValidators = {
    ...sharedValidators,
    required: !isFSS && sharedValidators.required,
  };

  useEffect(() => {
    const triggerDependentFields = async () => {
      isFSS && await trigger([
        `${passenger}.name`,
        `${passenger}.surname`,
        `${passenger}.gender`,
        `${passenger}.birthDate`,
      ]);
    };
    triggerDependentFields();
  }, [isFSS, passenger, trigger]);

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
          {...register(`${passenger}.isFSS`)}
          label="Оформление билета по ФСС"
        />
        {isFSS && (
          <FieldsContainer>
            <Controller
              control={control}
              name={`${passenger}.SNILS`}
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
          </FieldsContainer>
        )}
      </div>
      <FieldsContainer>
        <TextInput
          {...register(`${passenger}.surname`, dependentValidators)}
          label="Фамилия"
          error={errors?.surname?.message}
          disabled={isFSS}
          isRequired
        />
        <TextInput
          {...register(`${passenger}.name`, dependentValidators)}
          label="Имя"
          error={errors?.name?.message}
          disabled={isFSS}
          isRequired
        />
        <TextInput
          {...register(`${passenger}.middlename`)}
          label="Отчество (обязательно, при наличии)"
          disabled={isFSS}
        />
        <Select
          {...register(`${passenger}.gender`, dependentValidators)}
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
          name={`${passenger}.birthDate`}
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
          {...register(`${passenger}.nationality`, sharedValidators)}
          label="Гражданство"
          error={errors?.nationality?.message}
          isRequired
        >
          {Object.entries(countries.getNames("ru")).map(([value, label], id) => (
            <option key={id} value={value}>{label}</option>
          ))}
        </Select>
        <Select
          {...register(`${passenger}.documentType`, sharedValidators)}
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
          {...register(`${passenger}.documentNumber`, sharedValidators)}
          label="Номер документа"
          error={errors?.documentNumber?.message}
          isRequired
        />
        <Select
          {...register(`${passenger}.tariff`, sharedValidators)}
          label="Тариф"
          error={errors?.tariff?.message}
          isRequired
        >
          <option value="">Не выбрано</option>
          <option value="child">Детский</option>
          <option value="default">Обычный</option>
          <option value="premium">Премиум</option>
        </Select>
      </FieldsContainer>
      <div>
        <Checkbox
          {...register(`${passenger}.emergencyNotifications`)}
          label="Согласен на получение оповещений в случаях чрезвычайных ситуаций на железнодорожном транспорте"
        />
        <EmergencyDesc>
          В соответствии с п.7 Правил перевозок пассажиров, багажа, грузобагажа железнодорожным
          транспортом при покупке билета необходимо указать свои контактные данные.
        </EmergencyDesc>
        {hasEmergencyNotifications && (
          <FieldsContainer>
            <Controller
              control={control}
              name={`${passenger}.tel`}
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
              {...register(`${passenger}.email`, sharedValidators)}
              type="email"
              label="E-mail пассажира"
              error={errors?.email?.message}
              isRequired
            />
          </FieldsContainer>
        )}
      </div>
    </Fieldset>
  );
};

export default PassengerFieldset;
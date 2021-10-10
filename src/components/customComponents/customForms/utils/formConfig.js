import {
  maxLengthRule,
  minLengthRule,
  requiredRule,
  passwordMatchRule,
} from './inputValidationRule'
import Input from '../Input'

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 * @param {string} style - style for each input box
 */

const createFormFieldConfig = (
  defaultValue = '',
  label,
  name,
  type,
  placeholder,
  labelStyle,
  inputStyle,
  id,
  autoComplete,
  column,
  timeIntervals,
  timeCaption,
  dateFormat,
  showTimeSelect,
  showTimeSelectOnly
) => {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          id={id}
          placeholder={placeholder}
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          label={label}
          isValid={isValid}
          value={value}
          handleChange={handleChange}
          errorMessage={error}
          timeIntervals={timeIntervals}
          timeCaption={timeCaption}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={showTimeSelectOnly}
          column={column}
        />
      )
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false,
    labelStyle,
    inputStyle,
    id,
    autoComplete,
    placeholder,
  }
}

export const createSessionForm = {
  title: {
    ...createFormFieldConfig(
      '',
      'Title',
      'title',
      'text',
      'Session Title',
      'full',
      'full',
      '',
      'off'
    ),
    validationRules: [requiredRule('name'), minLengthRule('name', 3), maxLengthRule('name', 25)],
  },
  facilitator: {
    ...createFormFieldConfig(
      '',
      'Session Facilitator',
      'facilitator',
      'text',
      'facilitator',
      'full',
      'full',
      '',
      'off'
    ),
    validationRules: [requiredRule('name'), minLengthRule('name', 3), maxLengthRule('name', 25)],
  },
  email: {
    ...createFormFieldConfig('', "Facilitator's Email", 'email', 'email', 'email', 'full', 'full'),
    validationRules: [
      requiredRule('email'),
      minLengthRule('email', 10),
      maxLengthRule('email', 25),
    ],
  },
  start_date: {
    ...createFormFieldConfig(
      '',
      'Start Date',
      'start_date',
      '',
      'Select a Start Date',
      'full',
      'full',
      'date',
      'off',
      1
    ),
  },
  start_time: {
    ...createFormFieldConfig(
      '',
      'Start Time',
      'start_time',
      '',
      'Select a Start Time',
      'full',
      'full',
      'time',
      'off',
      1,
      15,
      'Time',
      'h:mm aa',
      true,
      true
    ),
  },
  end_date: {
    ...createFormFieldConfig(
      '',
      'End Date',
      'end_date',
      '',
      'Select an End Date',
      'full',
      'full',
      'date',
      'off',
      1
    ),
  },
  end_time: {
    ...createFormFieldConfig(
      '',
      'End Time',
      'end_time',
      '',
      'Select a End Time',
      'full',
      'full',
      'time',
      'off',
      1,
      15,
      'Time',
      'h:mm aa',
      true,
      true
    ),
  },
  number_of_registrants: {
    ...createFormFieldConfig('', 'Max number of registrants'),
  },
}

export const signupForm = {
  name: {
    ...createFormFieldConfig('Name', 'name', 'text', 'left', 'primary'),
    validationRules: [requiredRule('name'), minLengthRule('name', 3), maxLengthRule('name', 25)],
  },
  email: {
    ...createFormFieldConfig('Email', 'email', 'email'),
    validationRules: [
      requiredRule('email'),
      minLengthRule('email', 10),
      maxLengthRule('email', 25),
    ],
  },
  password: {
    ...createFormFieldConfig('Password', 'password', 'password'),
    validationRules: [
      requiredRule('password'),
      minLengthRule('password', 8),
      maxLengthRule('password', 20),
    ],
  },
  confirmPassword: {
    ...createFormFieldConfig('Confirm Password', 'confirmPassword', 'password'),
    validationRules: [passwordMatchRule()],
  },
}

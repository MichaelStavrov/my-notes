import { Field } from '../../types';

export const fields: Field[] = [
  {
    label: 'Логин',
    name: 'login',
    rules: [{ required: true, message: 'Введите логин' }],
  },
  {
    label: 'Пароль',
    name: 'password',
    rules: [{ required: true, message: 'Введите пароль' }],
  },
];

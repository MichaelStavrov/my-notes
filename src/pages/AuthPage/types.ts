import { Rule } from 'antd/es/form';

export type FormType = 'signin' | 'signup';

export interface Field {
  name: string;
  label: string;
  rules: Rule[];
  dependencies?: string[];
}

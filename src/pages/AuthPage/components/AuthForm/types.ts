export type FieldsName = {
  login: string;
  password: string;
  confirmPassword?: string;
};

export type Values = {
  [key in keyof FieldsName]: string;
};

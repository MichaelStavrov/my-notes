export const encryptPassword = (password: string) => {
  let encryptedPassword = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < password.length; i++) {
    encryptedPassword += alphabet[i % alphabet.length] + '2' + password[i];
  }

  return encryptedPassword.split('').reverse().join('');
};

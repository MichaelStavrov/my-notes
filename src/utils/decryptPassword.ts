export const decryptPassword = (encryptedPassword: string) => {
  let decryptedPassword = '';
  const reversedEncryptedPassword = encryptedPassword
    .split('')
    .reverse()
    .join('');
  for (let i = 0; i < reversedEncryptedPassword.length; i += 3) {
    decryptedPassword += reversedEncryptedPassword[i + 2];
  }
  return decryptedPassword;
};

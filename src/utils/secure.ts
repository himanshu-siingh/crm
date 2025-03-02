import CryptoJS from 'crypto-js';

const SECRET_KEY = 'seemarise@himanshu@1983';


export const secure = {
  encrypt: (text: string): string => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  },

  decrypt: (encryptedText: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};

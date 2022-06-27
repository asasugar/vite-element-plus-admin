import CryptoJS from 'crypto-js';
import { isObject } from './is';

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161');
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a');

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
export function encrypt(data: string) {
  if (isObject(data)) {
    try {
      data = JSON.stringify(data);
      const dataHex = CryptoJS.enc.Utf8.parse(data);
      const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString();
    } catch (error) {
      console.log('encrypt error:', error);
    }
  }
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export function decrypt(data: string) {
  if (!data) return data;
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

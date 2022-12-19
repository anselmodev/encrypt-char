import { baseEncode, baseDecode } from './helpers/base64';

export const encryptChar = {
  hardEncode(data: string, keychar: string, password: string) {
    const getData = data;
    const getKeychar = keychar;

    console.log(getData, getKeychar, password);

    return 'encoded';
  },

  hardDecode(data: string, keychar: string, password: string) {
    const getData = data;
    const getKeychar = keychar;

    console.log(getData, getKeychar, password);

    return 'decoded';
  },

  softEncode(data: string) {
    if (!data?.length || typeof data !== 'string') {
      throw new Error('Invalid "data" to encode.');
    }

    return baseEncode(data);
  },

  softDecode(data: string) {
    if (!data?.length || typeof data !== 'string') {
      throw new Error('Invalid "data" to encode.');
    }

    return baseDecode(data);
  },
};

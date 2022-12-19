import { baseEncode, baseDecode } from './lib/base64';
import { keycharParse, keycharGen } from './lib/keychar';
import { patterns } from './helpers/patterns';

export const encryptChar = {
  hardEncode(data: string, keychar: string, password: string) {
    if (!data?.length || typeof data !== 'string') {
      throw new Error('Empty "data" value.');
    } else if (!keychar?.length || typeof keychar !== 'string') {
      throw new Error('Empty "keychar" value.');
    } else if (!password?.length || typeof password !== 'string') {
      throw new Error('Empty "password" value.');
    }

    const keycharObject = keycharParse(keychar, password, 'encode');

    const encodeData = baseEncode(data);

    return encodeData.replace(
      patterns.baseKeysReg,
      (m: any) => keycharObject[m]
    );
  },

  hardDecode(data: string, keychar: string, password: string) {
    if (!data?.length || typeof data !== 'string') {
      throw new Error('Empty "data" value.');
    } else if (!keychar?.length || typeof keychar !== 'string') {
      throw new Error('Empty "keychar" value.');
    } else if (!password?.length || typeof password !== 'string') {
      throw new Error('Empty "password" value.');
    }

    const keycharObject = keycharParse(keychar, password, 'decode');
    const unmask = data.replace(
      patterns.baseKeysReg,
      (m: any) => keycharObject[m]
    );
    const decodeData = baseDecode(unmask);

    return decodeData;
  },

  softEncode(data: string) {
    if (!data?.length || typeof data !== 'string') {
      throw new Error('Invalid "data" to encode.');
    }

    return baseEncode(data);
  },

  softDecode(data: string) {
    if (!data?.length || typeof data !== 'string') {
      throw new Error('Invalid "data" to decode.');
    }

    return baseDecode(data);
  },

  generateKey(salt: number, password: string) {
    return keycharGen(salt, password).resultKeyChar;
  },
};

import { patterns } from '../helpers/patterns';
import { beginAndEndKeys } from '../helpers/begin-end-keys';
import { secretGenerator } from '../helpers/secret-generator';
import {
  saltPasswordEncode,
  // saltPasswordDecode,
} from '../helpers/salt-password';

const secretResult: string[] = [];

const __getSaltOfKeychar = (keychar: string) => {
  const resultCheck = (keychar.match(/-/g) || []).length;
  return resultCheck / 3 || 0;
};

const __primaryKeyGen = (salt: number) => {
  const primaryKeys = patterns.baseKeys.split('').map((letter: string) => {
    const secretGen = secretGenerator(salt);

    secretResult.push(secretGen);

    return letter + secretGen;
  });

  return primaryKeys.sort(() => Math.random() - 0.5).join('');
};

const __secondaryKeyGen = () => {
  const secondaryKeys = patterns.baseKeys
    .split('')
    .sort(() => Math.random() - 0.5)
    .map((letter: string, index: number) => {
      const secretGen = secretResult[index];
      return letter + secretGen;
    });

  return secondaryKeys.sort(() => Math.random() - 0.5).join('');
};

const keycharGen = (salt: number, password: string) => {
  if (!password?.length || typeof password !== 'string') {
    throw new Error('Empty Password.');
  }

  const getSalt = salt ? Number(salt) : 0;

  if (getSalt < 3 || Number.isNaN(getSalt)) {
    throw new Error('Invalid Salt value.');
  }

  const saltDate = saltPasswordEncode(getSalt, password);
  const beginAndEnd = beginAndEndKeys(getSalt);
  const primaryKeys = __primaryKeyGen(getSalt);
  const secondaryKeys = __secondaryKeyGen();

  const resultKeys = {
    secret: secretResult.join(''),
    primary: primaryKeys,
    secondary: secondaryKeys,
  };

  return {
    resultKeyChar:
      beginAndEnd.stringStart +
      saltDate +
      '.' +
      resultKeys.secret +
      '.' +
      resultKeys.primary +
      '.' +
      resultKeys.secondary +
      beginAndEnd?.stringEnd,
    resultSalt: saltDate,
  };
};

const keycharValidate = (keychar: string, password: string) => {
  if (!keychar?.length || typeof keychar !== 'string') {
    throw new Error('Invalid "keychar" value.');
  } else if (!password?.length || typeof password !== 'string') {
    throw new Error('Invalid "password" value.');
  }

  const getPointsSeparators = 3;

  const getSaltValue: any = __getSaltOfKeychar(keychar);

  const baseKeysLength = patterns.baseKeys.split('')?.length;

  const getBeginAndEndKeys = beginAndEndKeys(getSaltValue);
  const saltPassword = saltPasswordEncode(getSaltValue, password);

  const beginEndLength = (
    getBeginAndEndKeys?.stringStart + getBeginAndEndKeys?.stringEnd
  ).length;

  const getSecretLength = getSaltValue * baseKeysLength;

  const keysLength = (baseKeysLength + getSecretLength) * 2;

  const encodedSaltPassword = saltPassword?.length;

  const calculationResult =
    beginEndLength +
    encodedSaltPassword +
    getSecretLength +
    keysLength +
    getPointsSeparators;

  const cleanKeychar = keychar
    .replace(getBeginAndEndKeys.stringStart, '')
    .replace(getBeginAndEndKeys.stringEnd, '');

  const getSaltPassword = cleanKeychar.split('.')[0];

  return {
    isValid:
      calculationResult === keychar?.length && getSaltPassword === saltPassword,
    encodedSaltPassword: saltPassword,
  };
};

// const keyCharParse = (keychar: string, type: 'encode' | 'decode') => {
//   // let getSalt: number;
//   // let beginEndKeys: any;
//   // let getBeginEnd: any;
//   // let keycharResult: any = '';
//   // let secretResult: string[] = [];
//   // let primaryKey: any;
//   // let secondaryKey: any;
//   // // validar o keychar
//   // if (keyCharCheck(keychar)) {
//   //   getSalt = saltPasswordDecode(keychar);
//   //   beginEndKeys = beginAndEndKeys(getSalt);
//   //   getBeginEnd = Object.keys(beginEndKeys);
//   // } else {
//   //   throw new Error('Invalid Keychar!');
//   // }
//   // // remove BEGIN KEY and END KEY words
//   // if (
//   //   getBeginEnd.includes('stringStart') &&
//   //   getBeginEnd.includes('stringEnd')
//   // ) {
//   //   keycharResult = keychar
//   //     .replace(beginEndKeys.stringStart, '')
//   //     .replace(beginEndKeys.stringEnd, '');
//   // } else {
//   //   throw new Error('Invalid BEGIN KEY and END KEY!');
//   // }
//   // // split keychar
//   // keycharResult = keycharResult.split('.');
//   // // convert secret string to object
//   // if (keycharResult?.length === 3) {
//   //   secretResult = checkSecret(keycharResult[0], getSalt);
//   // } else {
//   //   throw new Error('Invalid Secret Object!');
//   // }
//   // // replaced with commas the secret combination from keycharResult (index 1 and index 2)
//   // if (secretResult?.length === 62) {
//   //   const regSecret = new RegExp(secretResult.join('|'), 'g');
//   //   primaryKey = keycharResult[1].replace(regSecret, ',');
//   //   secondaryKey = keycharResult[2].replace(regSecret, ',');
//   // } else {
//   //   throw new Error('Invalid Secret Object!');
//   // }
//   // // split arrays and remove last index
//   // primaryKey = primaryKey.split(',');
//   // secondaryKey = secondaryKey.split(',');
//   // primaryKey.pop();
//   // secondaryKey.pop();
//   // if (primaryKey?.length === 62 && secondaryKey?.length === 62) {
//   //   const finalObject: any = {};
//   //   if (type === 'encode') {
//   //     primaryKey.forEach(
//   //       (item: string, indx: number) => (finalObject[item] = secondaryKey[indx])
//   //     );
//   //   } else if (type === 'decode') {
//   //     secondaryKey.forEach(
//   //       (item: string, indx: number) => (finalObject[item] = primaryKey[indx])
//   //     );
//   //   }
//   //   return finalObject;
//   // } else {
//   //   throw new Error('Invalid primary and secondary keys!');
//   // }
// };

export { keycharValidate, keycharGen /* keyCharParse */ };

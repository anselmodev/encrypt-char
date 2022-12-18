import { patterns } from '../helpers/patterns';
import { beginAndEndKeys } from '../helpers/begin-end-keys';
import { secretGenerator } from '../helpers/secret-generator';
import { saltPasswordEncode } from '../helpers/salt-password';

const secretResult: string[] = [];

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

const keyCharGen = (salt: number, password: string) => {
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

const keyCharCheck = () => {};

export { keyCharCheck, keyCharGen };

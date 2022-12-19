import { baseEncode, baseDecode } from './base64';

const saltPasswordEncode = (salt: number | string, password: string) => {
  const getSalt = salt ? Number(salt) : 0;

  if (getSalt < 3 || Number.isNaN(getSalt)) {
    throw new Error('Invalid Salt value.');
  }

  if (!password?.length || typeof password !== 'string') {
    throw new Error('Invalid Password.');
  }

  const resultSalt = `${getSalt}.${baseEncode(password)}`;
  const result = resultSalt
    .split('')
    .reverse()
    .join('');

  return baseEncode(result);
};

const saltPasswordDecode = (
  password: string,
  saltFromKeychar: string,
  saltFromData?: string
) => {
  if (!password?.length || typeof password !== 'string') {
    throw new Error('Empty Password.');
  } else if (!saltFromKeychar?.length || typeof saltFromKeychar !== 'string') {
    throw new Error('Invalid string "saltFromKeychar" value.');
  }

  const __resultFromKeychar = baseDecode(saltFromKeychar)
    .split('')
    .reverse()
    .join('');

  if (saltFromData?.length) {
    if (typeof saltFromData !== 'string') {
      throw new Error('Invalid string "saltFromData" value.');
    }

    const resultFromData = baseDecode(saltFromData)
      .split('')
      .reverse()
      .join('');

    const prepareSaltAndPassword = {
      fromData: resultFromData.split('.'),
      fromKeychar: __resultFromKeychar.split('.'),
    };

    if (
      !prepareSaltAndPassword?.fromData[1] ||
      !prepareSaltAndPassword?.fromKeychar[1]
    ) {
      throw new Error('Password Check Error.');
    }

    const checkPassword = {
      fromData: baseDecode(prepareSaltAndPassword.fromData[1]),
      fromKeychar: baseDecode(prepareSaltAndPassword.fromKeychar[1]),
    };

    const passwordIsValid: boolean =
      checkPassword.fromData === checkPassword.fromKeychar &&
      checkPassword.fromData === password;

    return {
      passwordIsValid,
      saltValue: Number(prepareSaltAndPassword.fromData[0]),
    };
  } else {
    const prepareSaltAndPassword = __resultFromKeychar.split('.');

    if (!prepareSaltAndPassword[1]) {
      throw new Error('Password Check Error.');
    }

    const checkPassword = baseDecode(prepareSaltAndPassword[1]);

    const passwordIsValid: boolean = checkPassword === password;

    return {
      passwordIsValid,
      saltValue: Number(prepareSaltAndPassword[0]),
    };
  }
};

export { saltPasswordEncode, saltPasswordDecode };

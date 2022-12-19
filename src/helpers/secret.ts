import { patterns } from './patterns';

const secretGenerator = (salt: number | string) => {
  const getSalt = salt ? Number(salt) : 0;

  if (getSalt < 3 || Number.isNaN(getSalt)) {
    throw new Error('Invalid Salt value.');
  }

  let result = '';
  const charactersLength = patterns.baseKeys.length;

  for (let i = 0; i < salt; i++) {
    result += patterns.baseKeys.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return result;
};

const checkSecret = (secret: string, salt: number) => {
  const getSalt = salt ? Number(salt) : 0;

  if (getSalt < 3 || Number.isNaN(getSalt)) {
    throw new Error('Invalid Salt value.');
  } else if (!secret?.length || typeof secret !== 'string') {
    throw new Error('Invalid Secret value.');
  }

  const str = secret || '';
  const reg = new RegExp(`.{1,${salt}}`, 'g');
  return str.match(reg) || [];
};

export { secretGenerator, checkSecret };

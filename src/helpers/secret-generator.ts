import { patterns } from './patterns';

export const secretGenerator = (salt: number | string) => {
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

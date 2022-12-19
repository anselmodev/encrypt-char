import { patterns } from '../helpers/patterns';

const basePatternKey = patterns.basePatternKey;
const basePatternChar = patterns.basePatternChar;

const baseEncode = (data: string) => {
  if (!data?.length || typeof data !== 'string') {
    throw new Error('Invalid string value.');
  }

  const buff = Buffer.from(data, 'utf-8');
  const b64Result = buff.toString('base64');

  const replaceSpecialKeys = b64Result
    .replace(new RegExp(basePatternKey[0], 'g'), basePatternChar[0])
    .replace(new RegExp(basePatternKey[1], 'g'), basePatternChar[1])
    .replace(new RegExp(basePatternKey[2], 'g'), basePatternChar[2]);

  return replaceSpecialKeys;
};
const baseDecode = (data: string) => {
  if (!data?.length || typeof data !== 'string') {
    throw new Error('Invalid string value.');
  }

  const revertSpecialKeys = data
    .replace(new RegExp(`${basePatternChar[0]}`, 'g'), basePatternKey[3])
    .replace(new RegExp(`${basePatternChar[1]}`, 'g'), basePatternKey[4])
    .replace(new RegExp(`${basePatternChar[2]}`, 'g'), basePatternKey[5]);

  const buff = Buffer.from(revertSpecialKeys, 'base64');

  return buff.toString('utf-8');
};

export { baseDecode, baseEncode };

// import { encryptChar } from '../src';
import { baseEncode, baseDecode } from '../src/helpers/base64';
import {
  base64Mock,
  validSaltNumberMock,
  invalidSaltNumberMock,
  beginEndKeysMock,
  passwordSecret,
  resultSalt,
} from './mocks/string-number.mock';
import { beginAndEndKeys } from '../src/helpers/begin-end-keys';
import { secretGenerator } from '../src/helpers/secret-generator';
import {
  saltPasswordEncode,
  saltPasswordDecode,
} from '../src/helpers/salt-password';
import { keyCharGen } from '../src/lib/keychar';

describe('Base 64:', () => {
  it('should be encode', () => {
    expect(baseEncode(base64Mock.decodedText)).toEqual(base64Mock.encodedText);
  });

  it('should be decode', () => {
    expect(baseDecode(base64Mock.encodedText)).toEqual(base64Mock.decodedText);
  });

  it('should return a throw error of invalid string value', () => {
    expect(() => {
      baseEncode('');
    }).toThrow('Invalid string value.');

    expect(() => {
      baseDecode('');
    }).toThrow('Invalid string value.');
  });
});

describe('Begin and End Keys:', () => {
  it('should generate starting and ending keys', () => {
    expect(beginAndEndKeys(validSaltNumberMock)).toMatchObject(
      beginEndKeysMock
    );
  });

  it('should return a throw error of invalid salt value', () => {
    expect(() => {
      beginAndEndKeys(invalidSaltNumberMock);
    }).toThrow('Invalid Salt value.');

    expect(() => {
      beginAndEndKeys('string with number 10');
    }).toThrow('Invalid Salt value.');
  });
});

describe('Secret Generator:', () => {
  it('should generate secret sequence', () => {
    expect(secretGenerator(validSaltNumberMock)?.length).toEqual(
      validSaltNumberMock
    );
  });

  it('should return a throw error of invalid salt value', () => {
    expect(() => {
      secretGenerator(invalidSaltNumberMock);
    }).toThrow('Invalid Salt value.');

    expect(() => {
      secretGenerator('string with number 10');
    }).toThrow('Invalid Salt value.');
  });
});

describe('Salt and Password:', () => {
  const encodedSaltDate = saltPasswordEncode(
    validSaltNumberMock,
    passwordSecret
  );

  it('should be encode salt and date successfully', () => {
    expect(encodedSaltDate).toBeTruthy();
  });

  it('should be decode salt and date successfully', () => {
    expect(
      saltPasswordDecode(encodedSaltDate, encodedSaltDate, passwordSecret)
    ).toMatchObject({ passwordIsValid: true, saltValue: validSaltNumberMock });
  });

  it('should return a throw error of invalid salt value to encode', () => {
    expect(() => {
      saltPasswordEncode('', passwordSecret);
    }).toThrow('Invalid Salt value.');
  });

  it('should return a throw error of invalid password value to encode', () => {
    expect(() => {
      saltPasswordEncode(validSaltNumberMock, '');
    }).toThrow('Invalid Password.');
  });

  it('should return a throw error of invalid salt value to decode', () => {
    expect(() => {
      saltPasswordDecode(encodedSaltDate, '', passwordSecret);
    }).toThrow('Invalid string "saltFromKeychar" value.');

    expect(() => {
      saltPasswordDecode('', encodedSaltDate, passwordSecret);
    }).toThrow('Invalid string "saltFromData" value.');
  });

  it('should return a throw error of empty password value to decode', () => {
    expect(() => {
      saltPasswordDecode(encodedSaltDate, encodedSaltDate, '');
    }).toThrow('Empty Password.');
  });

  it('should return a throw error of password check value', () => {
    expect(() => {
      saltPasswordDecode(
        'fake salt and password',
        'fake salt and password',
        passwordSecret
      );
    }).toThrow('Password Check Error.');
  });
});

describe('Keychar Generate:', () => {
  const keyCharGenerate = keyCharGen(validSaltNumberMock, passwordSecret);

  it('should return a new encoded salt and password', () => {
    expect(keyCharGenerate?.resultSalt).toEqual(resultSalt);
  });

  it('should return a new keychar', () => {
    expect(keyCharGenerate?.resultKeyChar?.length).toEqual(967);
  });

  it('should return a throw error of invalid salt value', () => {
    expect(() => {
      keyCharGen(invalidSaltNumberMock, passwordSecret);
    }).toThrow('Invalid Salt value.');
  });

  it('should return a throw error of empty password value', () => {
    expect(() => {
      keyCharGen(validSaltNumberMock, '');
    }).toThrow('Empty Password.');
  });
});

// describe('Decrypt String', () => {
//   it('decode', () => {
//     expect(encryptChar.decode('', '')).toEqual('decoded');
//   });
// });

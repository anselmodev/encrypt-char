import { baseEncode, baseDecode } from '../src/lib/base64';
import { patterns } from '../src/helpers/patterns';
import {
  softEncodeDecodeMock,
  hardEncodeDecodeMock,
  decodedText,
  validSaltNumberMock,
  validKeycharAlternativeSaltMock,
  validKeycharAlternativePasswordMock,
  invalidSaltNumberMock,
  beginEndKeysMock,
  passwordSecret,
  resultSalt,
  validKeycharMock,
  invalidKeycharMock,
} from './mocks/string-number.mock';
import { beginAndEndKeys } from '../src/helpers/begin-end-keys';
import { secretGenerator } from '../src/helpers/secret';
import {
  saltPasswordEncode,
  saltPasswordDecode,
} from '../src/helpers/salt-password';
import { keycharGen, keycharValidate, keycharParse } from '../src/lib/keychar';
import { checkArraySameValues } from '../src/helpers/array-check-values';
import { encryptChar } from '../src';

describe('Check Array With Same Values:', () => {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = [5, 2, 1, 4, 3];
  const array3 = ['1', '2', '3', '4', '5'];

  it('should be same values', () => {
    expect(checkArraySameValues(array1, array2)).toEqual(true);
  });

  it('should not be same values', () => {
    expect(checkArraySameValues(array1, array3)).toEqual(false);
  });
});

describe('Base Encode:', () => {
  it('should be encode', () => {
    expect(baseEncode(decodedText)).toEqual(
      softEncodeDecodeMock.encodedText
    );
  });

  it('should be decode', () => {
    expect(baseDecode(softEncodeDecodeMock.encodedText)).toEqual(
      decodedText
    );
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
  const fakeSaltAndPassword = 'fake salt and password';

  it('should be encode salt and password successfully', () => {
    expect(encodedSaltDate).toBeTruthy();
  });

  it('should be decode salt and password successfully from "saltFromKeychar" and "saltFromData"', () => {
    expect(
      saltPasswordDecode(passwordSecret, encodedSaltDate, encodedSaltDate)
    ).toMatchObject({ passwordIsValid: true, saltValue: validSaltNumberMock });
  });

  it('should be decode salt and password successfully from "saltFromKeychar"', () => {
    expect(saltPasswordDecode(passwordSecret, encodedSaltDate)).toMatchObject({
      passwordIsValid: true,
      saltValue: validSaltNumberMock,
    });
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

  it('should return a throw error of invalid salt From Keychar', () => {
    expect(() => {
      saltPasswordDecode(passwordSecret, '');
    }).toThrow('Invalid string "saltFromKeychar" value.');
  });

  it('should return a throw error of empty password value to decode', () => {
    expect(() => {
      saltPasswordDecode('', encodedSaltDate, encodedSaltDate);
    }).toThrow('Empty Password.');
  });

  it('should return a throw error of password check value', () => {
    expect(() => {
      saltPasswordDecode(
        passwordSecret,
        fakeSaltAndPassword,
        fakeSaltAndPassword
      );
    }).toThrow('Password Check Error.');
  });
});

describe('Keychar Generate:', () => {
  const keyCharGenerate = keycharGen(validSaltNumberMock, passwordSecret);

  it('should return a new encoded salt and password', () => {
    expect(keyCharGenerate?.resultSalt).toEqual(resultSalt);
  });

  it('should return a new keychar', () => {
    expect(keyCharGenerate?.resultKeyChar?.length).toEqual(967);
  });

  it('should return a throw error of invalid salt value', () => {
    expect(() => {
      keycharGen(invalidSaltNumberMock, passwordSecret);
    }).toThrow('Invalid Salt value.');
  });

  it('should return a throw error of empty password value', () => {
    expect(() => {
      keycharGen(validSaltNumberMock, '');
    }).toThrow('Empty Password.');
  });
});

describe('Keychar Validate:', () => {
  it('should be keychar valid', () => {
    expect(keycharValidate(validKeycharMock, passwordSecret)?.isValid).toEqual(
      true
    );
  });

  it('should be keychar invalid', () => {
    expect(
      keycharValidate(invalidKeycharMock, passwordSecret)?.isValid
    ).toEqual(false);
  });

  it('should be valid password to validate keychar', () => {
    expect(keycharValidate(validKeycharMock, passwordSecret)?.isValid).toEqual(
      true
    );
  });

  it('should be invalid password to validate keychar', () => {
    expect(keycharValidate(validKeycharMock, 'fakePassword')?.isValid).toEqual(
      false
    );
  });

  it('should return a throw error of empty keychar value', () => {
    expect(() => {
      keycharValidate('', passwordSecret);
    }).toThrow('Invalid "keychar" value.');
  });

  it('should return a throw error of empty password value', () => {
    expect(() => {
      keycharValidate(validKeycharMock, '');
    }).toThrow('Invalid "password" value.');
  });
});

describe('Keychar Parse:', () => {
  const correctEncodeKeycharParse = keycharParse(
    validKeycharMock,
    passwordSecret,
    'encode'
  );

  const correctDecodeKeycharParse = keycharParse(
    validKeycharMock,
    passwordSecret,
    'decode'
  );

  it('should parse encode correct keys', () => {
    expect(
      checkArraySameValues(
        Object.keys(correctEncodeKeycharParse),
        patterns.baseKeys.split('')
      )
    ).toEqual(true);
  });

  it('should parse decode correct keys', () => {
    expect(
      checkArraySameValues(
        Object.keys(correctDecodeKeycharParse),
        patterns.baseKeys.split('')
      )
    ).toEqual(true);
  });

  it('should parse encode correct values', () => {
    expect(
      checkArraySameValues(
        Object.values(correctEncodeKeycharParse),
        patterns.baseKeys.split('')
      )
    ).toEqual(true);
  });

  it('should parse decode correct values', () => {
    expect(
      checkArraySameValues(
        Object.values(correctDecodeKeycharParse),
        patterns.baseKeys.split('')
      )
    ).toEqual(true);
  });

  it('should return a throw error of parse encode invalid keychar', () => {
    expect(() => {
      keycharParse(invalidKeycharMock, passwordSecret, 'encode');
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of parse decode invalid keychar', () => {
    expect(() => {
      keycharParse(invalidKeycharMock, passwordSecret, 'decode');
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of parse encode empty keychar', () => {
    expect(() => {
      keycharParse('', passwordSecret, 'encode');
    }).toThrow('Invalid "keychar" value.');
  });

  it('should return a throw error of parse decode empty keychar', () => {
    expect(() => {
      keycharParse('', passwordSecret, 'decode');
    }).toThrow('Invalid "keychar" value.');
  });

  it('should return a throw error of parse encode empty password', () => {
    expect(() => {
      keycharParse(validKeycharMock, '', 'encode');
    }).toThrow('Invalid "password" value.');
  });

  it('should return a throw error of parse decode empty password', () => {
    expect(() => {
      keycharParse(validKeycharMock, '', 'decode');
    }).toThrow('Invalid "password" value.');
  });
});

describe('Soft Encode and Decode:', () => {
  it('should encode data successfully', () => {
    expect(encryptChar.softEncode(decodedText)).toEqual(
      softEncodeDecodeMock.encodedText
    );
  });

  it('should decode data successfully', () => {
    expect(encryptChar.softDecode(softEncodeDecodeMock.encodedText)).toEqual(
      decodedText
    );
  });

  it('should return a throw error of encode empty data', () => {
    expect(() => {
      encryptChar.softEncode('');
    }).toThrow('Invalid "data" to encode.');
  });

  it('should return a throw error of decode empty data', () => {
    expect(() => {
      encryptChar.softDecode('');
    }).toThrow('Invalid "data" to decode.');
  });
});

describe('Hard Encode and Decode:', () => {
  it('should encode data successfully', () => {
    expect(
      encryptChar.hardEncode(
        decodedText,
        validKeycharMock,
        passwordSecret
      )
    ).toEqual(hardEncodeDecodeMock.encodedText);
  });

  it('should decode data successfully', () => {
    expect(
      encryptChar.hardDecode(
        hardEncodeDecodeMock.encodedText,
        validKeycharMock,
        passwordSecret
      )
    ).toEqual(decodedText);
  });

  it('should return a throw error of empty "data" to encode', () => {
    expect(() => {
      encryptChar.hardEncode('', validKeycharMock, passwordSecret);
    }).toThrow('Empty "data" value.');
  });

  it('should return a throw error of empty "keychar" to encode', () => {
    expect(() => {
      encryptChar.hardEncode(
        hardEncodeDecodeMock.encodedText,
        '',
        passwordSecret
      );
    }).toThrow('Empty "keychar" value.');
  });

  it('should return a throw error of empty "password" to encode', () => {
    expect(() => {
      encryptChar.hardEncode(
        hardEncodeDecodeMock.encodedText,
        validKeycharMock,
        ''
      );
    }).toThrow('Empty "password" value.');
  });

  it('should return a throw error of empty "data" to decode', () => {
    expect(() => {
      encryptChar.hardDecode('', validKeycharMock, passwordSecret);
    }).toThrow('Empty "data" value.');
  });

  it('should return a throw error of empty "keychar" to decode', () => {
    expect(() => {
      encryptChar.hardDecode(
        hardEncodeDecodeMock.encodedText,
        '',
        passwordSecret
      );
    }).toThrow('Empty "keychar" value.');
  });

  it('should return a throw error of empty "password" to decode', () => {
    expect(() => {
      encryptChar.hardDecode(
        hardEncodeDecodeMock.encodedText,
        validKeycharMock,
        ''
      );
    }).toThrow('Empty "password" value.');
  });

  it('should return a throw error of invalid "keychar" to encode', () => {
    expect(() => {
      encryptChar.hardEncode(
        hardEncodeDecodeMock.encodedText,
        invalidKeycharMock,
        passwordSecret
      );
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of alternative "keychar" with different "password" to encode', () => {
    expect(() => {
      encryptChar.hardEncode(
        hardEncodeDecodeMock.encodedText,
        validKeycharAlternativePasswordMock,
        passwordSecret
      );
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of alternative "keychar" with different "password" to decode', () => {
    expect(() => {
      encryptChar.hardDecode(
        hardEncodeDecodeMock.encodedText,
        validKeycharAlternativePasswordMock,
        passwordSecret
      );
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of alternative "keychar" with different "salt" to encode', () => {
    expect(() => {
      encryptChar.hardEncode(
        hardEncodeDecodeMock.encodedText,
        validKeycharAlternativeSaltMock,
        passwordSecret
      );
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of alternative "keychar" with different "salt" to decode', () => {
    expect(() => {
      encryptChar.hardDecode(
        hardEncodeDecodeMock.encodedText,
        validKeycharAlternativeSaltMock,
        passwordSecret
      );
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of invalid "keychar" to decode', () => {
    expect(() => {
      encryptChar.hardDecode(
        hardEncodeDecodeMock.encodedText,
        invalidKeycharMock,
        passwordSecret
      );
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of invalid "password" to encode', () => {
    expect(() => {
      encryptChar.hardEncode(
        hardEncodeDecodeMock.encodedText,
        invalidKeycharMock,
        'Fake Password'
      );
    }).toThrow('Invalid Keychar.');
  });

  it('should return a throw error of invalid "password" to decode', () => {
    expect(() => {
      encryptChar.hardDecode(
        hardEncodeDecodeMock.encodedText,
        invalidKeycharMock,
        'Fake Password'
      );
    }).toThrow('Invalid Keychar.');
  });
});

describe('Generate Keychar:', () => {
  const keycharGen = encryptChar.generateKey(
    validSaltNumberMock,
    passwordSecret
  );

  it('should be generate keychar successfully', () => {
    expect(keycharGen.resultKeyChar?.length).toEqual(1215);
  });

  it('should not be generated keychar with "salt" error', () => {
    expect(() => {
      encryptChar.generateKey(invalidSaltNumberMock, passwordSecret);
    }).toThrow('Invalid Salt value.');
  });

  it('should not be generated keychar with "password" empty', () => {
    expect(() => {
      encryptChar.generateKey(validSaltNumberMock, '');
    }).toThrow('Empty Password.');
  });
});

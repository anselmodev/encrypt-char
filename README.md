<p align="center">
  <img src="./encrypt-icon.png" alt="Data encryption and decryption tool" title="Data encryption and decryption tool" width="200" />
</p>

<h1 align="center">encrypt-char</h1>

## Features

- Lightweight, zero dependencies.
- Works with any NodeJs projects.
- High performance and security.
- Simple usage.

<br>

## Install

#### Install with NPM or YARN:

```shell script
$ npm i encrypt-char
```

or

```shell script
$ yarn add encrypt-char
```

#### Methods

- [`generateKey`](#generate-a-new-keychar)
- [`hardEncode`](#hard-encode-data)
- [`hardDecode`](#hard-decode-data)
- [`softEncode`](#soft-encode-data)
- [`softDecode`](#soft-decode-data)

<br />

## Generate a New Keychar

### [`encryptChar.generateKey(salt, password)`](#encryptchargeneratekeysalt-number-password-string)

```js
import { encryptChar } from 'encrypt-char';

const mySalt = 6;
const mySecretPassword = 'secretPassword1234';

const myKeychar = encryptChar.generateKey(mySalt, mySecretPassword);
```

## Hard Encode Data

### [`encryptChar.hardEncode(data, keychar, password)`](#encryptcharhardencodedata-string-keychar-string-password-string)

```js
import { encryptChar } from 'encrypt-char';

const mySecretPassword = 'secretPassword1234';
const myText = 'Lorem ipsum dolor sit amet. 1234567890 !@#$%^&*()_+';

const resultEncode = encryptChar.hardEncode(
  myText,
  myKeychar,
  mySecretPassword
);

// return 'hYjIzzH1Mjw1no7CeoA5Flnb3VQR6PKC4VmxZJLC9s2leCGv0NLxe9fdQUmDe9fx6NLA'
```

## Hard Decode Data

### [`encryptChar.hardDecode(encodedData, keychar, password)`](#encryptcharharddecodeencodeddata-string-keychar-string-password-string)

```js
import { encryptChar } from 'encrypt-char';

const mySecretPassword = 'secretPassword1234';
const myEncodedText =
  'hYjIzzH1Mjw1no7CeoA5Flnb3VQR6PKC4VmxZJLC9s2leCGv0NLxe9fdQUmDe9fx6NLA';

const resultDecode = encryptChar.hardDecode(
  myEncodedText,
  myKeychar,
  mySecretPassword
);

// return 'Lorem ipsum dolor sit amet. 1234567890 !@#$%^&*()_+'
```

## Soft Encode Data

### [`encryptChar.softEncode(data)`](#encryptcharsoftencodedata-string)

```js
import { encryptChar } from 'encrypt-char';

const myText = 'Lorem ipsum dolor sit amet. 1234567890 !@#$%^&*()_+';

const resultDecode = encryptChar.softEncode(myText);

// return 'r8VKooiJeVCJjAUIgATO4cjN1QzMyEDIuQXZtFGI0l2cgI3bs9GZg0WdzBXag0WZy9GT'
```

## Soft Decode Data

### [`encryptChar.softDecode(encodedData)`](#encryptcharsoftdecodeencodeddata-string)

```js
import { encryptChar } from 'encrypt-char';

const myEncodedText =
  'r8VKooiJeVCJjAUIgATO4cjN1QzMyEDIuQXZtFGI0l2cgI3bs9GZg0WdzBXag0WZy9GT';

const resultDecode = encryptChar.softDecode(myEncodedText);

// return 'Lorem ipsum dolor sit amet. 1234567890 !@#$%^&*()_+'
```

<br />

## Paramenters

### `encryptChar.generateKey(salt: number, password: string)`

The <b>"salt"</b> to increase the encoding complexity. <br>
The <b>"password"</b> to sign and validate keychar. <br><br>

### `encryptChar.hardEncode(data: string, keychar: string, password: string)`

The <b>"data"</b> text to encode. <br>
The <b>"keychar"</b> generated to encode text. <br>
The <b>"password"</b> to sign and validate keychar. <br><br>

### `encryptChar.hardDecode(encodedData: string, keychar: string, password: string)`

The <b>"encodedData"</b> text previously encoded. <br>
The <b>"keychar"</b> generated to decode text. <br>
The <b>"password"</b> to sign and validate keychar. <br><br>

### `encryptChar.softEncode(data: string)`

The <b>"data"</b> text to encode. <br><br>

### `encryptChar.softDecode(encodedData: string)`

The <b>"encodedData"</b> text previously encoded. <br><br>

## Recomendations

### Store the generated <b>"keychar"</b> and <b>"password"</b> in a safe place! <br>

The <b>"keychar"</b> is a unique key that guarantees encoding and decoding using only in  <b>"hardEncode"</b> and <b>"hardDecode"</b> methods.
Losing the <b>"keychar"</b> or <b>"password"</b> makes it impossible to reverse any encoded text.

<br>

## Autor

| [<img src="https://avatars2.githubusercontent.com/u/14978874?v=3&s=115"><br><sub>@anselmodev</sub>](https://github.com/anselmodev) |
| :--------------------------------------------------------------------------------------------------------------------------------: |


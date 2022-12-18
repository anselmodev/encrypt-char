const base64Mock = {
  encodedText:
    'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQuIDEyMzQ1Njc4OTAgIUAjJCVeJiooKV8r',
  decodedText: 'Lorem ipsum dolor sit amet. 1234567890 !@#$%^&*()_+',
};
const validSaltNumberMock = 4;
const invalidSaltNumberMock = 2;
const beginEndKeysMock = {
  stringStart: 'BEGIN KEY ----',
  stringEnd: '-------- END KEY',
};
const passwordSecret = 'MYpasswordSecret1234';
const resultSalt =
    'MzQyMzBMUFJRek15RURkbEozWWxORlp5OTJkek5YWXdsVlQuNARPL03243RPL03243';

export {
  base64Mock,
  validSaltNumberMock,
  invalidSaltNumberMock,
  beginEndKeysMock,
  passwordSecret,
  resultSalt
};

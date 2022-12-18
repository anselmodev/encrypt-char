export const encryptChar = {
  encode(data: string, keychar: string) {
    const getData = data;
    const getKeychar = keychar;

    console.log(getData, getKeychar);

    return 'encoded';
  },

  decode(data: string, keychar: string) {
    const getData = data;
    const getKeychar = keychar;

    console.log(getData, getKeychar);

    return 'decoded';
  },
};

export const patterns: any = {
  baseKeys: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  basePatternKey: [/\+/, /\//, /\=/, '+', '/', '='],
  basePatternChar: ['RPL09445', 'RPL03456', 'RPL03243'],
  baseKeysReg: new RegExp(/[A-Za-z0-9]/, 'g'),
  baseReg1: new RegExp(/\+/, 'g'),
  baseReg2: new RegExp(/\//, 'g'),
  baseReg3: new RegExp(/\=/, 'g'),
  baseReg4: new RegExp(/RPL09445/, 'g'),
  baseReg5: new RegExp(/RPL03456/, 'g'),
  baseReg6: new RegExp(/RPL03243/, 'g'),
};

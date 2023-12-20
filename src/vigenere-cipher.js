const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  checkArguments(...args) {
    if (args.some(arg => !arg || typeof arg !== 'string')) {
      throw new Error('Incorrect arguments!');
    }
  }

  transformMessage(message, key, operation) {
    this.checkArguments(message, key);

    message = message.toUpperCase();
    key = key.toUpperCase();
    let result = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      const char = message[i];
      if (char.match(/[A-Z]/)) {
        const charCode = ((char.charCodeAt(0) - 65) + operation(key[j % key.length].charCodeAt(0) - 65) + 26) % 26 + 65;
        result += String.fromCharCode(charCode);
        j++;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  encrypt(message, key) {
    return this.transformMessage(message, key, x => x);
  }

  decrypt(encryptedMessage, key) {
    return this.transformMessage(encryptedMessage, key, x => -x);
  }
}

module.exports = {
  VigenereCipheringMachine
};

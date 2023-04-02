// Import encryptors
const encryptors = require('./encryptor.js');

const { caesarCipher, symbolCipher, reverseCipher } = encryptors;

const encodeMessage = (str) => {
    return reverseCipher(symbolCipher(caesarCipher(str, 6)));
}

const decodeMessage = (str) => {
    return caesarCipher(symbolCipher(reverseCipher(str)), -6);
}

// User input / output logic:
const handleInput = (userInput) => {
    const str = userInput.toString().trim();
    let output;
    if (process.argv[2] === 'encode') {
        output = encodeMessage(str);
    }
    if (process.argv[2] === 'decode') {
        output = decodeMessage(str);
    }

    process.stdout.write(output + '\n');
    process.exit();
}

// Run program:
process.stdout.write('Enter a message you would like to encrypt: ');
process.stdin.on('data', handleInput);
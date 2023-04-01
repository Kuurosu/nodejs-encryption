// Import encryptors object here:
const encryptors = require('./encryptor.js');

const { caesarCipher, symbolCipher, reverseCipher } = encryptors;

// User input / output logic:
const encryptionMethod = getEncryptionMethod();
process.stdout.on('data', (userInput) => {
    displayEncryptedMessage(encryptionMethod, userInput);
});

function getEncryptionMethod() {
    let encryptionMethod;

    const encryptionType = process.argv[2];
    if (encryptionType === 'symbol') {
        encryptionMethod = symbolCipher;
    } else if (encryptionType === 'reverse') {
        encryptionMethod = reverseCipher;
    } else if (encryptionType === 'caesar') {
        let amount = Number(process.argv[3]);
        if (Number.isNaN(amount)) {
            process.stdout.write(`Try again with a valid amount argument. \n`);
            process.exit();
        }
        encryptionMethod = (str) => caesarCipher(str, amount);
    }
    else {
        process.stdout.write(`Try again with a valid encryption type argument. \n`);
        process.exit();
    }

    process.stdout.write('Enter a message to encrypt: ');
    return encryptionMethod;
};

function displayEncryptedMessage(encryptionMethod, userInput) {
    let str = userInput.toString().trim();
    let output = encryptionMethod(str);
    process.stdout.write(`Here is the encrypted message: ${output} \n`)
    process.exit();
}
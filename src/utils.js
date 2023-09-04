import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function required(data, key, validate = () => true, help = "") {
    let value = data[key];

    if (!validate(value)) {
        throw `[${key}] ${help}`;
    }

    if (!value) {
        throw `[${key}] is required`;
    } else {
        return value;
    }
}

const isString = value => typeof value === 'string';
const isNumber = value => typeof value === 'number';

export {
    required,
    isString,
    isNumber,
    __dirname
}
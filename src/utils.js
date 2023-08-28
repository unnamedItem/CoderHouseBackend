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
    isNumber
}
export const requiredCheck = {
    required: true
}

export const emailCheck = {
    ...requiredCheck,
    pattern: "([a-zA-Z0-9._+-]+)@([a-zA-Z0-9-.]+)\.([a-z]{2,6}$)"
};

export const passwordCheck = {
    ...requiredCheck,
    minLength: 6,
    maxLength: 20,
};

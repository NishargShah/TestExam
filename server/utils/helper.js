exports.filterBody = (body, ...allowedFields) => {
    const newBody = {};
    Object.keys(body).forEach(cur => {
        if (allowedFields.includes(cur)) newBody[cur] = body[cur];
    });
    return newBody;
};

exports.isObjEmpty = obj => {
    return Object.getOwnPropertyNames(obj).length === 0;
}

exports.isArrEmpty = arr => {
    return Array.isArray(arr) && arr.length;
}

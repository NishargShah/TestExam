import Cookies from "universal-cookie";

export const isObjEmpty = obj => {
    return Object.getOwnPropertyNames(obj).length === 0;
};

export const isArrEmpty = arr => {
    return Array.isArray(arr) && arr.length;
};

export const filterBody = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(cur => {
        if (allowedFields.includes(cur)) newObj[cur] = obj[cur];
    });
    return newObj;
};

export const getToken = () => {
    const cookies = new Cookies();
    return cookies.get('token');
}

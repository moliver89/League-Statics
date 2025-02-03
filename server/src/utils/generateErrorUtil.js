const generateErrorUtil = (msg, code) => {
    console.log('Entro a la funcion ErrorUtil');
    const err = new Error(msg);
    err.httpStatus = code;
    throw err;
};

export default generateErrorUtil;

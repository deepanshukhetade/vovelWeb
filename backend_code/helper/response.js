

module.exports = {
    successResponse: (res, code, message, data) => {
        res.status(code).json({
            status: 'SUCCESS',
            code: code,
            message:message,
            data: data
        });
    },
    errorMsgResponse: (res, code, resData) => {
        res.status(code).json({
            status: 'ERROR',
            code: code,
            message: resData
        });
    },

}
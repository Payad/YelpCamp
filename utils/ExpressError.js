class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

// error handling class used to catch and process errors
// without passing to express default error handling middleware 
// class ExpressError extends Error {
//     constructor(statusCode, message) {
//         super();
//         this.message = message;
//         this.statusCode = statusCode;
//     }
// }


module.exports = ExpressError;
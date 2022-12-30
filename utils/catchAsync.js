// module.exports = func => {
//     return(req, res, next) => {
//         func(req, res, next).catch(next)
//     }
// }

// a function used to pass in the error parameters
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}
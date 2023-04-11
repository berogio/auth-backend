export default (error, req, res, next) => {
    res.status(400).json(error.message)
}
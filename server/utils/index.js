export const handleError = (err,res,msg) => {
    res.status(500).json({
        message: msg,
        error
    })
}
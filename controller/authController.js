const signup = (req, res, next) => {
    res.json({
        status:'success',
        message:'signup is working succesfully'
    })
}

module.exports = {signup}
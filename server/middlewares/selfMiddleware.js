exports.userMe = (req, res, next) => {
    req.params.id = req.user._id;
    req.user.isMe = true;
    next();
};

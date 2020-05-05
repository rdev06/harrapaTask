module.exports = (req, res, next) => {
  if (req.user.seller) {
    next();
  } else {
    res.status(401).json({ msg: 'You are not seller to add item' });
  }
};

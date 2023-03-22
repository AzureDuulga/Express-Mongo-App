const logger = (req, res, next) => {
  console.log(
    `${req.method}${req.protocol}://${req.hostname}${req.originalURL}`
  );
  next();
};

module.exports = logger;

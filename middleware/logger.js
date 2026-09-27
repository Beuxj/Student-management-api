const logger = (req, res, next) => {

    const currentDate = new Date().toLocaleString();

    console.log(
        `[${currentDate}] ${req.method} ${req.originalUrl}`
    );

    next();
};

module.exports = logger;

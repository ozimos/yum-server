import { BaseError } from 'sequelize';

const validationErrors = (err, req, res, next) => {
    if (err.error && err.error.isJoi) {
        const message = {};
        err.error.details.forEach((elem) => {
            const key = elem.path[0] || 'error';
            message[key] = elem.message;
        });
        return res.status(400).json({
            message,
        });
    }
    if (err instanceof BaseError) {
        const error = err.original || err.parent || err;
        return res.status(422).json({
            message: error.message,
        });
    }
    return res.status(400).json({ message: err.message });
};

export default validationErrors;

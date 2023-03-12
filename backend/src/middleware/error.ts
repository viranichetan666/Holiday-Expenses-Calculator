/**
 * Error Handler Sends Stack Trace only during Development Environment
 *
 * @public
 *
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const ErrorHandler = (err, req, res, next) => {
    const response = {
      code: err.status || 500,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    };
    res.status(response.code).json(response);
    res.end();
  };
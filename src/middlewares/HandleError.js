import logger from "../utils/Logger.js";

const HandleError = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Error en el servidor";

  logger.error(`[Code: ${status}]: ${message}`);

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
      path: req.originalUrl,
      method: req.method,
    },
  });
};

export default HandleError;

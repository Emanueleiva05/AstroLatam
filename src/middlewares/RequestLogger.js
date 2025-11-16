import logger from "../utils/Logger.js";

const RequestLogger = (req, res, next) => {
  const start = Date.now();
  const reqId = Math.random().toString(36).substring(2, 9);
  req.reqId = reqId;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logMsg = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    logger.info(`[${reqId}] ${logMsg}`);
  });

  next();
};
export default RequestLogger;

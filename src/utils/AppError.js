export class AppError extends Error {
  constructor(message, status = 500) {
    this.message = message;
    this.status = status;
  }
}

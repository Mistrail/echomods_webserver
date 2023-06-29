export default class HttpError extends Error {
  /**
   *
   * @param {string} message
   * @param {number} code
   * @param {import('express').Response} responder
   * @param {any} options
   */
  constructor(
    message,
    code,
    responder,
    options = undefined,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    responder.set(code).send({ message, code, ...options });
  }
}

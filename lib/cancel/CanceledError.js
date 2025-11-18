'use strict';

import AxiosError from '../core/AxiosError.js';

class CanceledError extends AxiosError {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string|Error|any} message The cancellation reason.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    const hasMessage = message != null;
    const cause = message instanceof Error ? message : (hasMessage && typeof message === 'object' ? message : null);
    const finalMessage = cause ? cause.message : hasMessage ? String(message) : 'canceled';

    super(finalMessage, AxiosError.ERR_CANCELED, config, request);

    this.name = 'CanceledError';
    this.__CANCEL__ = true;
    this.reason = message;

    if (cause && cause !== this) {
      this.cause = cause;
    }
  }
}

export default CanceledError;

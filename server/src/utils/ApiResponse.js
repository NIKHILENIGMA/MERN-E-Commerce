/**
 * Constructs a new instance.
 *
 * @param {number} statusCode - The status code of the response.
 * @param {Object} data - The data to be sent in the response.
 * @param {string} [message="Success"] - The message to be sent in the response.
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };

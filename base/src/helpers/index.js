function createReadableMessageFromJoi(error) {
  if (error.details && Array.isArray(error.details)) {
    const {message} = error.details[0];
    const msg = message.replace(/"/gi, '');
    return msg;
  }

  return error;
}
module.exports = {createReadableMessageFromJoi};

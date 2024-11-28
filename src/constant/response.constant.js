exports.createSuccessResponse = (message, data = {}) => {
  return {
    status: 'success',
    message: message,
    data: data,
  }
}

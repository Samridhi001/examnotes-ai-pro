export function sendSuccess(res, data = {}, message = "Success", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

export function sendCreated(res, data = {}, message = "Created") {
  return sendSuccess(res, data, message, 201);
}

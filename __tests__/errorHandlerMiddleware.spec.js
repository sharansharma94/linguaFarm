const errorHandlerMiddleware = require('../src/middlewares/errorHandlerMiddleware');

describe('errorHandlerMiddleware', () => {
  it('should respond with 500 and error message', () => {
    const err = new Error('Test error');
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    errorHandlerMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});

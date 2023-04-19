const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

const authMiddleware = require('../src/middlewares/authMiddleware');

describe('authMiddleware', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if token is invalid', async () => {
        const req = {
            headers: {
                authorization: 'Bearer invalid_token',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        jwt.verify.mockImplementation((token, secretKey, callback) => {
            callback({ name: 'JsonWebTokenError' });
        });

        await authMiddleware(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Failed to authenticate token.' });
    });

    it('should set req.userId if token is valid', async () => {
        const req = {
            headers: {
                authorization: 'Bearer valid_token',
            },
        };
        const res = {};
        const next = jest.fn();

        jwt.verify.mockImplementation((token, secretKey, callback) => {
            callback(null, { id: 'user_id' });
        });

        await authMiddleware(req, res, next);

        expect(req.userId).toBe('user_id');
        expect(next).toHaveBeenCalled();
    });

});

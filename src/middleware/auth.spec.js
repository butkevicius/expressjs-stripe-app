const auth = require('./auth');

test('redirect if not authenticated', () => {
  const req = {
    isAuthenticated: jest.fn()
  };
  const next = jest.fn();
  const res = {
    redirect: jest.fn()
  };
  req.isAuthenticated.mockReturnValue(false);

  auth(req, res, next);

  expect(res.redirect).toBeCalledWith('/login');
  expect(next).not.toBeCalled();
});

test('call next if authenticated', () => {
  const req = {
    isAuthenticated: jest.fn()
  };
  const next = jest.fn();
  const res = {
    redirect: jest.fn()
  };
  req.isAuthenticated.mockReturnValue(true);

  auth(req, res, next);

  expect(next).toBeCalled();
  expect(res.redirect).not.toBeCalled();
});

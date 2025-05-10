import createError from 'http-errors';
import JWT from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Missing or malformed header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Pass an Error object to next()
    return next(createError(401, 'Authentication failed'));
  }

  // 2. Extract token
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verify token
    const payload = JWT.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info and proceed
    req.user = { userId: payload.userId };
    return next();

  } catch (err) {
    // 5. Verification failed
    return next(createError(401, 'Authentication failed'));
  }
};

export default userAuth;

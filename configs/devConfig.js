const {
  NODE_ENV, JWT_SECRET,
} = process.env;

const devSecret = 'dev-secret';

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : devSecret;

module.exports = SECRET;

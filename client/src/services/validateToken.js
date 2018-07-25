import jwt from 'jsonwebtoken';

const validateToken = (user) => {
  const { token } = user;
  let valid = true;
  const decoded = jwt.decode(token);

  const { exp, isCaterer } = decoded;
  if (exp < Math.floor(Date.now() / 1000)) {
    valid = false;
  }
  return { valid, isCaterer };
};

export default validateToken;

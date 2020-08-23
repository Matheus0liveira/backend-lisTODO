import bcrypt from 'bcrypt';

async function checkPassword(password, encriptPassword) {
  const compare = await bcrypt.compare(password, encriptPassword);
  return compare;
}

export default checkPassword;

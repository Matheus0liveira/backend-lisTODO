import bcrypt from 'bcrypt';

async function encrypt(password) {
  const password_hash = await bcrypt.hash(password, 8);
  return password_hash;
}

export default encrypt;

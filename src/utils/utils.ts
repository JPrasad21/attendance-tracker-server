import * as bcrypt from 'bcrypt';

async function hashing(password: string) {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export {
  hashing
}
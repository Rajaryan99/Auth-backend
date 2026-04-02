import bcrypt from 'bcrypt'

const password = "1234";

const saltRounds = 10;

  const hassedPassword = await bcrypt.hash(password, saltRounds);

console.log(password)
console.log(hassedPassword)
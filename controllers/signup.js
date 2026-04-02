import user from '../models/user.model.js'
import status from 'status'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {

      const {username, email, password}  = req.body;

    try {

      if(!username || !email || !password){
        
        console.log("Fill alll the details")
      }

      const isAlreadyRegister = await user.findOne({
        $or: [
            {username},
            {email}
        ]
      })

      if(isAlreadyRegister){
        return res.status(409).json({
            message: "username or email already exist!"
        })
      }

      const hassedPassword = await bcrypt.hash(password, 10);

      const newUser = await user.create({
        username,
        email, 
        password: hassedPassword
      })

      return res.status(200).json({
        message: "UserCreated successfully",
        data: newUser,
      })





    } catch (error) {
        console.log(error);
  return res.status(500).json({
    message: "Internal Server Error"
  });
    }

    

}
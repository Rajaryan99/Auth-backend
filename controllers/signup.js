import user from '../models/user.model.js'
import status from 'status'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

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

     

      const token = jwt.sign(
        {
        id: newUser._id
      },
      process.env.JWT_SECRET, 
      {
        expiresIn: '1d'
      }

     )

      return res.status(201).json({
        message: "UserCreated successfully",
        data: newUser,
        token: token

      })





    } catch (error) {
        console.log(error);
  return res.status(500).json({
    message: "Internal Server Error"
  });
    }

    

}

export const getMe = async (req, res) => {
    const token  = req.headers.authorization?.split(" ")[1];


    if(!token){
        return res.status(401).json({
            message: "Token not found"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const userData  = await user.findById(decoded.id);
    
    if(userData){
        return res.status(200).json({
            message: "User fetched successfully",
            users: {
                username: userData.username,
                email: userData.email
            }

        })
    }
    
}
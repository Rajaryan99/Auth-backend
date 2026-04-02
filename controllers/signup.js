import user from '../models/user.model.js'
import status from 'status'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signup = async (req, res) => {

      const {username, email, password}  = req.body;

    try {

      if(!username || !email || !password){
        alert("Please Fill all the detsils")
        console.log("Fill alll the details")
      }

      const isAlreadyRegister = await user.findOne({
        $or: [
            {username},
            {email}
        ]
      })

      if(isAlreadyRegister){
        res.status(409).json({
            message: "username or email already exist!"
        })
      }



      const  
    } catch (error) {
        
    }

    

}
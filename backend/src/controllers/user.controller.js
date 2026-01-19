import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are important" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User Registered Successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    //check if user exist
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({ message: "User Dosent Exist!" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    res
      .status(200)
      .json({
        message: "User logged in",
        user: { id: user.id, email: user.email, username: user.username },
      });
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
};


const logoutUser = async ( req, res)=>{
  try {
    const {email} = req.body;

    const user  = await User.findOne({
      email: email.toLowerCase()
    })

    if (!user) return res.status(404).json({message:"User Dosent Exist"});

    res.status(200).json({message:"Logout Sucessful"});

  } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
  }
}

export { registerUser, loginUser, logoutUser };

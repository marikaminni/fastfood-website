const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  // #swagger.tags = ["Auth"]
  // #swagger.summary = "User registration"
  // #swagger.description = "Register a new user"
  try {
    const { name, password } = req.body;
    const userExist = await db.User.findOne({
      where: { name },
    });
    if (userExist) {
      return res.status(400).json({ message: "Username already exists" });
    }

    await db.User.create({
      name,
      password: await bcrypt.hash(password, 8),
    });
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore nella creazione dell'utente" });
  }
};

const signIn = async (req, res) => {
  // #swagger.tags = ["Auth"]
  // #swagger.summary = "User login"
  // #swagger.description = "Login user and generate JWT token"
  try {
    const { name, password } = req.body;
    console.log(name, password);
    const user = await db.User.findOne({
      where: {
        name,
      },
    });
    //console.log("User", user);
    if (!user || user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found", user);

    //Check password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(404).json({ message: "Invalid password" });
    }
    console.log("valid password", passwordValid);

    //Authenticate user with JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    //Generate refresh token
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    // Set refresh token as an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      secure: true, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Set the expiration time - 7 days
    });

    return res.status(200).json({
      id: user.id,
      name: user.name,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error during login" });
  }
};

//verify refresh token and generate new access token
const refreshToken = (req, res) => {
  // #swagger.tags = ["Auth"]
  // #swagger.summary = "Refresh access token"
  // #swagger.description = "Generate new access token using refresh token"
  const cookie = req.cookies.refreshToken;

  if (cookie) {
    jwt.verify(cookie, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        //handle invalid or expired refresh token
        res.status(401).json({ error: "invalid or expired refresh token" });
      } else {
        //generate new token
        const newJwtToken = jwt.sign(
          { id: decoded.id },
          process.env.JWT_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "1h",
          }
        );

        //Update the JWT token in session storage
        sessionStorage.setItem("accessToken", newJwtToken);

        //Return the new token to the client
        res.status(200).json({ accessToken: newJwtToken });
      }
    });
  } else {
    //no refresh token found, prompt user to login
    res.status(401).json({ error: "No refresh token found" });
  }
};

const logout = async (req, res) => {
  // #swagger.tags = ["Auth"]
  // #swagger.summary = "User logout"
  // #swagger.description = "Logout user and clear refresh token cookie"
  try {
    res.clearCookie("refreshToken", {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error("Error during logout", error);
    res.status(500).json({ message: "Error during logout" });
  }
};

module.exports = { signUp, signIn, refreshToken, logout };

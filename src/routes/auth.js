const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData, sanitizeString } = require("../utils/validation");
const validator = require("validator");
// bcrypt is NOT needed here — the model's pre("save") hook handles hashing automatically

//Sign-up api
authRouter.post("/signup", async (req, res) => {
  try {
    const allowedFields = ["firstName", "lastName", "emailId", "password"];

    //Validation of data
    validateSignUpData(req);

    // Sanitize FIRST, THEN destructure — so we use the clean values when creating the User
    Object.keys(req.body).forEach((key) => {
      if (!allowedFields.includes(key)) {
        delete req.body[key];
      } else if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });

    // Destructure AFTER sanitization so the values are clean
    const { firstName, lastName, emailId, password } = req.body;

    // Pass the plain password — pre("save") hook in user model will hash it automatically
    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
    });

    await user.save();

    res.json({
      message: "User signed up successfully!",
      user,
    });
  } catch (error) {
    console.error("Error signing up user", error);
    res.status(400).send("Error signing up the user:" + error.message);
  }
});

//Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //validation of emailid
    if (!emailId || !password) {
      throw new Error("Email ID and password are required");
    }

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email address");
    }

    const user = await User.findOne({ emailId }).select("+password");

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    //decrypting the password and comparing with the hashed password in the database
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //Create a JWT token
      const token = await user.getJWT();

      // Cross-origin cookie settings:
      // - sameSite: "none"  → required for cookies to be sent on cross-origin requests
      //   (Vercel frontend → Railway backend are different domains)
      // - secure: true      → required whenever sameSite is "none" (HTTPS only)
      // - httpOnly: true    → prevents JS access to the token (XSS protection)
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
      });

      res.json({
        message: "Login successful!",
        user,
      });
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (err) {
    res.status(400).send("Login failed! " + err.message);
  }
});

//logout API
authRouter.post("/logout", async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    res.send("Logout successful!");
  } catch (err) {
    res.status(400).send("Logout failed! " + err.message);
  }
});

module.exports = authRouter;

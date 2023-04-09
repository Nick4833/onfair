const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");
const validator = require("validator");

exports.signup = async (req, res, next) => {
  let { name, email, password, password_confirmation, location, role } =
    req.body;

  let errors = [];
  (!name || name.trim().length === 0) &&
    errors.push({ name: "Name is empty." });
  !validator.isEmail(email) && errors.push({ email: "Email is incorrect." });
  !validator.isStrongPassword(password) &&
    errors.push({ password: "Password is not strong enough." });
  password != password_confirmation &&
    errors.push({
      password_confirmation: "The confirmation password is incorrect.",
    });
  (!location || location.trim().length === 0) &&
    errors.push({ location: "Location is empty." });
  (!role || role.trim().length === 0) &&
    errors.push({ role: "Role is empty." });

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  } else {

  const user = await User.findOne({ email: email }).catch((error) => {
    res.status(500).json({
      errors: [{ error: "Something went wrong.😢" }],
    });
  });

  if (user) {
    res.status(422).json({ errors: "email already exists" });
  } else {

  const newUser = new User({
    name: name,
    email: email,
    password: password,
    location: location,
    role: role,
  });

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) throw error;

      newUser.password = hash;
      newUser.save();

      let accesstoken = createJWT(newUser.email, newUser._id, 3600);
      jsonwebtoken.verify(
        accesstoken,
        process.env.TOKEN_SECRET,
        (error, decoded) => {
          if (decoded) {
            res.status(200).json({
              success: true,
              token: accesstoken,
              user: newUser,
            });
          }
        }
      );
    });
  });
}
}
};

exports.login = (req, res) => {
  try {
    console.log(req.body);
    let { email, password } = req.body;

    let errors = [];
    !validator.isEmail(email) && errors.push({ email: "Email is incorrect." });
    !password && errors.push({ password: "Password field is empty." });

    if (errors.length > 0) {
      res.status(422).json({ errors: errors });
    }

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "No user found.😢" }],
        });
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          console.log(result);
          if (!result) {
            return res.status(400).json({
              errors: [{ errors: "Email and Password do not match." }],
            });
          }
          let accesstoken = createJWT(user.email, user._id, 3600);
          jsonwebtoken.verify(
            accesstoken,
            process.env.TOKEN_SECRET,
            (error, decoded) => {
              if (error) {
                res.status(500).json({
                  errors: error,
                });
              }

              if (decoded) {
                res.status(200).json({
                  success: true,
                  token: accesstoken,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  },
                });
              }
            }
          );
        });
      }
    });
  } catch (error) {}
};

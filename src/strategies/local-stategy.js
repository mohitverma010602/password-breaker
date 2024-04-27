import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user.model.js";

passport.serializeUser((user, done) => {
  done(null, user?.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const foundUser = await User.findById(userId, { password: 0 });
    console.log(foundUser);
    if (!foundUser) throw new Error("User not Found");
    done(null, foundUser);
  } catch (error) {
    done(error, false);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username });
      if (!foundUser) {
        throw new Error("User not found");
      }
      const validPassword = await foundUser.comparePassword(password);
      if (!validPassword) {
        throw new Error("Invalid Credentials");
      }
      done(null, foundUser);
    } catch (error) {
      done(error, false);
    }
  })
);

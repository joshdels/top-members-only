const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

function initializePassport() {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("username:", username);
        const user = await db.getUserByUsername(username);
        console.log("user:", user);

        if (!user) {
          console.log("No user found");
          return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password);
        console.log("match:", match);

        if (!match) {
          console.log("Wrong password");
          return done(null, false);
        }

        console.log("Login success");
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserById(id);
      console.log("user", user)
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;

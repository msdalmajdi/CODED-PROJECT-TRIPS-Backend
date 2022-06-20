const connectDb = require("./database");
const express = require("express");
const profileRoutes = require("./api/profiles/profile.routes");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const userRoutes = require("./api/users/users.routes");

const cors = require("cors");

const app = express();

connectDb();

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(express.json());
app.use(cors());

// app.use("/api/profile", profileRoutes);

app.use(userRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8095, () => {
  console.log("The application is running on localhost:8095");
});

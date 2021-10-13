const express = require("express");
const fs = require("fs");
const router = express.Router();
const usersController = require("../controllers/usersController");
fs.readFile("./usersJSON.json", (err, data) => {
    if (err) throw err;
    registeredUsers = JSON.parse(data);
});

// Get requests

router.get("/", (req, res) => {
    res.render("signup", { message: "Sign up" });
});
router.get("/login", (req, res) => {
    res.render("login", { message: "Login" });
});
// Post Requests

router.post("/signup", usersController.signupUser);
router.post("/login", usersController.loginUser);
module.exports = router;

const { json } = require("express");
const fs = require("fs");
let registeredUsers = [];
fs.readFile("./usersJSON.json", (err, data) => {
    if (err) throw err;
    registeredUsers = JSON.parse(data);
});
const passwordValidator = require("password-validator");

function getAge(dob) {
    const dateOfBirth = new Date(dob);
    const today = new Date();
    const age = today.getTime() - dateOfBirth.getTime();
    return Math.floor(age / 31536000000);
}

module.exports = {
    signupUser: (req, res) => {
        console.log(req.body);
        if (req.body.password === req.body["password-confirm"]) {
            console.log("Passwords Matched");
            const passwordSchema = new passwordValidator();
            passwordSchema.is().min(8);
            delete req.body["password-confirm"];
            const checkIfExist = registeredUsers.some(
                (user) => user.email === req.body.email
            );
            if (!checkIfExist) {
                req.body.age = getAge(req.body["date-of-birth"]);
                registeredUsers.push(req.body);
            } else res.send("User already exist");
            fs.writeFileSync(
                "./usersJSON.json",
                JSON.stringify(registeredUsers)
            );
            res.redirect("/login");
        } else {
            console.log("Passwords not matched");
            res.status(500).send("Passwords don't match");
        }
    },
    loginUser: (req, res) => {
        console.log(req.body);
        const user = registeredUsers.find((user) => {
            return user.email === req.body.email;
        });
        if (user && user.password === req.body.password)
            res.render("admin", { message: "Admin", users: registeredUsers });
        else res.status(404).send("User Not found");
    },
};

const createAdmin = async (req, res, next) => {
    console.log("success");
    res.json("success")
};

const login = async (req, res, next) => {
    console.log("login");
    res.json("login")
};


module.exports = {
    createAdmin,
    login
}
const allJobs = require('../models/JobModel.js');
const router = express.Router();

const createAdmin = async (req, res, next) => {
    console.log("success");
    res.json("success")
};

const login = async (req, res, next) => {
    console.log("login");
    res.json("login")
};

const getAllJobs = () => {
    return async (req, res, next) => {

      console.log('getAllJobs()');
      try {
        const abc = await allJobs.JobModel.find();
        res.json(abc);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  };


module.exports = {
    createAdmin,
    login,
    getAllJobs

}
const classService = require("./classService");

exports.classGet = (req, res, next) => {
    index(req, res, next);
};


exports.CreateNewPost = async (req, res, next) => {
    const data = req.body;
    console.log(data);
    await classService.addNewClass(data);
    res.json(true);
};

async function index(req, res, next) {
    const classes = await classService.getClasses();
    res.json(classes);
};
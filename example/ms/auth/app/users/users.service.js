const { 
	users: Users
} = require('../../helpers/db.helper');

const list = async (req, res) => {
    const users = await Users.findAll();
    return res.status(200).message('success').return(users);
};

const userDetails = async (req, res) => {

    const userId = req.params.id;

    const user = await Users.find({ where : { id:  userId}});

    return res.message('RESULT_NOT_FOUND').return(user);

};

module.exports = { list, userDetails };

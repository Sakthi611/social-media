const userProfile = require("../model/userProfile")



const getController = async (req, res) => {
    try {
        const user = await userProfile.find();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json(
            {
                success: false,
                message: "No user Profile Found"
            }
        )
    }

}


const getControllerById = async (req, res) => {
    try {
        const user = await userProfile.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "enter the Valid id"
            });
        }
        return res.status(200).json({
            success: true,
            user: user
        });

    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Something went wrong"
        })
    }

}


const putController = async (req, res) => {
    try {

        const { name, profilePicture } = req.body;
        const updateUser = await userProfile.findByIdAndUpdate(req.params.id,
            { name, profilePicture },
            { new: true });
        if (!updateUser) {
            return res.status(400).json({
                success: false,
                message: "No User Found with this id"
            })
        }

        res.status(200).json({
            success: true,
            message: "user updated Successfully"
        })

    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
const createUser = async (req, res) => {
    try {
        const user = new userProfile({
            name: req.body.name,
            profilePicture:req.body.profilePicture,
        })
        await user.save();
        res.status(201).json({
            success: true,
            message: "User Created Successfully"
        })
    }
    catch (error) {
       console.log(error);
    }
}
// createUser();

module.exports = {
    getController,
    getControllerById,
    putController,
    createUser
}
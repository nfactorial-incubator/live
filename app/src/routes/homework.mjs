import Assignment from '../model/hwAssignment.mjs';

const createAssignment = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!(title && description)) {
            res.status(400).send("Title and description are required!")
        }

        const mentorId = req.auth.id;

        const assignment = await Assignment.create({
            title,
            description,
            mentorId
        });

        return res.status(200).json(assignment);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ "message": "some shit on our side" })
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        await Assignment.deleteOne({ _id: id })
        return res.status(200).json({ message: "deleted assignment successfully!" });
    } catch (err) {
        console.log(err);
        return res.status(502).json({ "message": "some shit on our side" })
    }
};

const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        return res.status(200).json(assignments);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ "message": "some shit on our side" })
    }
};

const getAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findOne({ _id: id })
        return res.status(200).json(assignment);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ "message": "some shit on our side" })
    }
};

export { createAssignment, deleteAssignment, getAllAssignments, getAssignment };
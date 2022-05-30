import Assignment from '../model/hwAssignment.mjs';
import Submission from '../model/hwSubmission.mjs';

const createAssignment = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!(title && description)) {
            res.status(400).send('Title and description are required!');
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
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        await Assignment.deleteOne({ _id: id });
        return res
            .status(200)
            .json({ message: 'deleted assignment successfully!' });
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        return res.status(200).json(assignments);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const getAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findOne({ _id: id });
        return res.status(200).json(assignment);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const createSubmission = async (req, res) => {
    try {
        const { title, description, assignmentId } = req.body;

        if (!(title && description)) {
            return res.status(400).send('Title and description are required!');
        }

        if (!assignmentId) {
            return res.status(400).send('Assignment Id is required!');
        }

        const studentId = req.auth.id;

        const assignment = await Submission.create({
            title,
            description,
            assignmentId,
            studentId
        });

        return res.status(200).json(assignment);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const getAllSubmissions = async (req, res) => {
    try {
        const studentId = req.auth.id;
        const submissions = await Submission.find({ studentId });
        return res.status(200).json(submissions);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const getSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.auth.id;
        const submission = await Submission.findOne({ _id: id, studentId });
        return res.status(200).json(submission);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const deleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.auth.id;
        await Submission.deleteOne({ _id: id, studentId });
        return res
            .status(200)
            .json({ message: 'deleted submission successfully!' });
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const commentSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.auth.id;
        const comment = { text };
        const updated = await Submission.findOneAndUpdate(
            {
                $and: [
                    { _id: id },
                    { $or: [{ studentId: userId }, { mentorId: userId }] }
                ]
            },
            { $push: { comments: comment } },
            { new: true }
        );
        if (updated) {
            return res.status(200).json(updated);
        } else {
            return res
                .status(400)
                .json({ message: 'Вы не можете комментировать эту домашку' });
        }
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const gradeSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const { grade } = req.body;
        const mentorId = req.auth.id;

        if (
            !(
                grade === 'plastic' ||
                grade === 'bronze' ||
                grade === 'silver' ||
                grade === 'gold' ||
                grade === 'premium'
            )
        ) {
            return res.status(400).json({
                message:
                    'Оценка должна быть одной из plastic | bronze | silver | gold | premium'
            });
        }

        const updated = await Submission.findOneAndUpdate(
            { _id: id },
            { grade, mentorId },
            { new: true }
        );

        return res.status(200).json(updated);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

export {
    createAssignment,
    deleteAssignment,
    getAllAssignments,
    getAssignment,
    createSubmission,
    getAllSubmissions,
    getSubmission,
    deleteSubmission,
    commentSubmission,
    gradeSubmission
};

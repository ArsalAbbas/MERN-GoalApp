const asyncHandler = require('express-async-handler');

const goalModel=require('../models/goalModel')

//@desc Get all goals
//@route GET /api/goals
//@access Private
const getGoal= async(req, res) => {
    const goals= await goalModel.find()

    res.status(200).json(goals)
}


//@desc set all goals
//@route SET /api/goals
//@access Private
const setGoal= asyncHandler(async(req, res) => {
    if(!req.body.text){
    res.status(400).json({message: 'Please enter a goal'})
    throw new Error('Please enter a goal')
    }

    const goals=await goalModel.create({
        text: req.body.text
    })

    res.status(200).json(goals)
} )


//@desc update all goals
//@route PUT /api/goals
//@access Private
const updateGoal= asyncHandler(async(req, res) => {

    const goal= await goalModel.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal=await goalModel.findByIdAndUpdate(req.params.id, req.body, {new: true,})


    res.status(200).json(updatedGoal)
})

//@desc Delete all goals
//@route DELETE /api/goals
//@access Private
const deleteGoal= asyncHandler(async(req, res) => {

    const goal=await goalModel.findByIdAndDelete(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    res.status(200).json(goal)
})





module.exports = {getGoal, setGoal, updateGoal, deleteGoal};

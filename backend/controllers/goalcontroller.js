const asyncHandler = require('express-async-handler');

const goalModel=require('../models/goalModel')
const userModel=require('../models/userModel')


//@desc Get all goals
//@route GET /api/goals
//@access Private
const getGoal= async(req, res) => {
    // console.log('Reached Goal Controller')
    const goals= await goalModel.find({user: req.user.id})

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
        text: req.body.text,
        user: req.user.id
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
    
    const user= await userModel.findById(req.user.id)

//Check for user
if(!user){
    res.status(401)
    throw new Error('User not found')
}

//Match logged in user with goal user
if(goalModel.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
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

    const user= await userModel.findById(req.user.id)

//Check for user
if(!user){
    res.status(401)
    throw new Error('User not found')
}

//Match logged in user with goal user
if(goal.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
}

    res.status(200).json(goal)
})





module.exports = {getGoal, setGoal, updateGoal, deleteGoal};

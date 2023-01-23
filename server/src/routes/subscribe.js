const { Router } = require('express');
const Users = require('../database/schemas/User');
const Subscribes = require('../database/schemas/Subscribe');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/:id', authMiddleware, async(req, res)=>{
    try{
        const subscribed = req.user.id;
        const to = req.params.id;

        if(subscribed === to){
            return res.status(400).send({msg: "User cannot follow himself"});
        }

        //const check = await Subscribes.findOne({subscribed: subscribed, to: to});

        // if(check){
        //     return res.status(400).send({msg: "user cannot subscribe twice"});
        // }

        const newSubscribe = await Subscribes.create({subscribed, to});

        res.status(200).send(newSubscribe);

    }
    catch(error){
        console.log(error);
        res.status(500).send({msg: "Server error"})
    }
});

router.delete('/:id', authMiddleware, async(req,res)=>{
try{
}
catch(error){
    console.log(error);
    res.status(500).send({msg: "Server error"})
}
});

module.exports = router;

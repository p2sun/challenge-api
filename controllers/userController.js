var User = require('../models/user.models');

exports.createUser = function(req,res){
    var user = new User();
    user.Id = Math.random().toString(36).slice(2);
    user.githubID = req.body.githubID;
    user.name = req.body.name;
    user.email = req.body.email;
    user.challenges = [];
    user.attempts =[];
    
    user.save(function(error){
        if(err) res.send(error);
        res.json({message: 'User successfully created', data:user});
    });
}

exports.getUser = function(req, res){
    User.find({githubID:req.params.id},function(err, user) {
        if (err) res.send(err);
        if(!user.active) res.send('User Does Not Exist');
        res.json(user);
    });
}

exports.getUserAttempts = function(req,res){
    User.find({githubID:req.params.id},
        function(err, user)  { if (err) res.send(err);})
    .populate('attempts')
    .exec(function(err, user){
        if(err) res.send(err);
        if(!user.active) res.send('User Does Not Exist');
        res.json(user.attempts);
    });
}

exports.getUserChallenges = function(req,res){
    User.find({githubID:req.params.githubID},
        function(err, user)  { if (err) res.send(err);})
    .populate('challenges')
    .exec(function(err, user){
        if(err) res.send(err);
        if(!user.active) res.send('User Does Not Exist');
        res.json(user.challenges);
    });
}

/*

exports.addChallenge = function(req, res){
    User.find({githubID:req.params.githubID}, function(err, user){
        if (err) res.send(err);
        if(!user.active) res.send('User Does Not Exist');
        user.challenges
        
        user.save(function(err){
            if (err) res.send(err);
            res.json(user);
        });
    }
}*/

exports.deleteUser = function(req,res){
    User.findByIdAndRemove(req.params.id,
        function(err){
            if(err) res.send(err);
            res.json({message:'User is deleted'});
        });
}
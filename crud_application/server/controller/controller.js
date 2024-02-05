var User = require('../model/model');

// Create User
exports.createUser = (req, res) => {
    // Check if request body is empty
    if (!req.body) {
        res.status(400).send({
            message: "Content should not be empty"
        });
        return;
    }

    // Create a new User instance using the data from the request body
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // Save the user in the database
    newUser.save()
        .then(data => {
            // res.status(201).send(data); // Send the saved data as the response
            res.redirect('/add_user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user."
            });
        });
};

// Find user
exports.getUser = (req, res) => {
    if(req.query.id){
        const id=req.query.id
        User.findById(id)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(404).send({
                message:`Given id is Not in the List ${id}`
            })
        })
    }else
    {
    User.find()
    .then(user=>{
        res.send(user)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error Occured wile get the User information"
        })
    })
    }
};

// Update the user
exports.updateUser = (req, res) => {
    
    if(!req.body){
        return res.status(400)
        .send({
            message:"Data to update not to empty"
        }) 
    }
    const id=req.params.id
    User.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({
                message:`cannot update user with ${id}. May be not found`
            })
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Errrorr"})
    })
};

// Delete user
exports.deleteUser = (req, res) => {
    // Implement code to delete a user
    const id=req.params.id
    User.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message:`Error with ${id}`
            })
        }else{
            res.send({message:`User Deleted Succesfully`})
        }
    }).catch(err=>{
        res.status(404).send({
            message:`Not able to delete User with this ${id}`
        })
    })
};

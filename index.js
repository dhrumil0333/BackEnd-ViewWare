const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');

const app = express()
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ViewWare');

app.post('/log', async (req, res) => {
    const { Email, password } = req.body;
    EmployeeModel.findOne({ Email: Email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("Success");
            }else{
                res.json("Wrong Password");
            }
        }else{
            res.json("User not found");
        }
    })
});

app.post('/sign' , async (req, res) => {

    try {
        const { firstName, lastName, password, Email, PhoneNo } = req.body; 

        const existingUser = await EmployeeModel.findOne({ Email: Email });
        if (existingUser) {
            return res.status(402).json({ error: "Email already registered" });
        }

        const newEmployee = new EmployeeModel({
            firstName,
            lastName,          
            password,
            Email,
            PhoneNo
        });

        await newEmployee.save(); 
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/user/:email', async (req, res) => {
    try {
        const user = await EmployeeModel.findOne({ Email: req.params.email });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            Email: user.Email,
            PhoneNo: user.PhoneNo,
            address: user.address,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/update-address', async (req, res) => {
    try {
        const { Email, address } = req.body;

        // Find the user by email and update the address
        const updatedUser = await EmployeeModel.findOneAndUpdate(
            { Email: Email },
            { $set: { address: address } },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Address updated successfully", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})
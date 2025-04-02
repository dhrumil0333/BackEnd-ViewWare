const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    Email: {
        type: String,
    },
    PhoneNo: {
        type: Number,
    },
    password: {
        type: String,
    },
    address: {
         type: String, 
         default: "" 
    }
});

const EmployeeModel = mongoose.model('Register', EmployeeSchema);
module.exports = EmployeeModel;
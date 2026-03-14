const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    // --- CORE AUTH ---
    name: { type: String, required: [true, 'Please provide name'], minlength: 3, maxlength: 50 },
    email: { 
        type: String, required: [true, "Please provide email"], unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email']
    },
    password: { type: String, required: [true, 'Please provide password'], minlength: 3 },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },

    // --- TEXT TELEMETRY ONLY ---
    enrollmentNo: { type: String },
    branch: { type: String },
    semester: { type: String },
    residence: { type: String }
}, { timestamps: true });

UserSchema.pre("save", async function(next){
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", UserSchema);
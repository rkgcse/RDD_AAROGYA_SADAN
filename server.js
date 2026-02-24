// server.js - Node.js Express Backend Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const validator = require('validator');

// Load environment variables
dotenv.config();

const app = express();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MIDDLEWARE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATABASE CONNECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

connectDB();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPOINTMENT SCHEMA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, 'Please provide a valid phone number']
    },
    doctor: {
        type: String,
        required: true,
        enum: [
            'rakesh-gupta',
            'ashish-ranjan',
            'shalini-krishna',
            'emily-watson',
            'david-kumar',
            'lisa-anderson'
        ]
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMAIL CONFIGURATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DOCTOR MAPPING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const doctorMap = {
    'rakesh-gupta': 'Dr. Rakesh Gupta (General Medicine)',
    'ashish-ranjan': 'Dr. Ashish Ranjan (Pediatrics)',
    'shalini-krishna': 'Dr. Shalini Krishna (Ophthalmology)',
    
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SEND EMAIL FUNCTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const sendConfirmationEmail = async (appointment) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: appointment.email,
        subject: '✅ Appointment Confirmation - Maa RDD Aarogya Sadan',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f8fafb; padding: 20px;">
                <div style="background-color: white; border-radius: 10px; padding: 30px; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #1a4d7a; text-align: center;">Appointment Confirmed</h1>
                    
                    <p>Dear <strong>${appointment.name}</strong>,</p>
                    
                    <p>Your appointment has been successfully booked at <strong>Maa RDD Aarogya Sadan</strong>.</p>
                    
                    <div style="background-color: #f0f4f8; border-left: 4px solid #00a870; padding: 20px; margin: 20px 0;">
                        <p><strong>📅 Appointment Details:</strong></p>
                        <p>
                            <strong>Doctor:</strong> ${doctorMap[appointment.doctor]}<br>
                            <strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}<br>
                            <strong>Time:</strong> ${appointment.time}<br>
                            <strong>Reason:</strong> ${appointment.reason}
                        </p>
                    </div>
                    
                    <div style="background-color: #f0f4f8; border-left: 4px solid #2a7cb9; padding: 20px; margin: 20px 0;">
                        <p><strong>📞 Contact Information:</strong></p>
                        <p>
                            <strong>Phone:</strong> +91 98350 67876<br>
                            <strong>Email:</strong> info@aarogyasadan.com<br>
                            <strong>Address:</strong> Basudeopur Chaputa, Hajipur, Vaishali, Bihar
                        </p>
                    </div>
                    
                    <p><strong>⏰ Please arrive 10 minutes before your appointment time.</strong></p>
                    
                    <p>If you need to cancel or reschedule, please contact us at least 24 hours in advance.</p>
                    
                    <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
                        © 2024 Maa RDD Aarogya Sadan. All rights reserved.
                    </p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Confirmation email sent to:', appointment.email);
    } catch (error) {
        console.error('❌ Email sending error:', error);
    }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SEND EMAIL TO ADMIN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const sendAdminEmail = async (appointment) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: '🔔 New Appointment Booking',
        html: `
            <h2>New Appointment Booking</h2>
            <p><strong>Name:</strong> ${appointment.name}</p>
            <p><strong>Email:</strong> ${appointment.email}</p>
            <p><strong>Phone:</strong> ${appointment.phone}</p>
            <p><strong>Doctor:</strong> ${doctorMap[appointment.doctor]}</p>
            <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Reason:</strong> ${appointment.reason}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Admin notification email sent');
    } catch (error) {
        console.error('❌ Admin email sending error:', error);
    }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROUTES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Health Check
app.get('/api/health', (req, res) => {
    res.json({ message: '✅ Server is running' });
});

// Book Appointment
app.post('/api/appointments', async (req, res) => {
    try {
        const { name, email, phone, doctor, date, time, reason } = req.body;

        // Validation
        if (!name || !email || !phone || !doctor || !date || !time || !reason) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email address' 
            });
        }

        // Phone validation
        if (!validator.isMobilePhone(phone)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid phone number' 
            });
        }

        // Create appointment
        const appointment = new Appointment({
            name,
            email,
            phone,
            doctor,
            date: new Date(date),
            time,
            reason
        });

        // Save to database
        await appointment.save();

        // Send confirmation emails
        await sendConfirmationEmail(appointment);
        await sendAdminEmail(appointment);

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully!',
            appointment: appointment
        });

    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({
            success: false,
            message: 'Error booking appointment',
            error: error.message
        });
    }
});

// Get All Appointments (Admin)
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: appointments.length,
            appointments: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments',
            error: error.message
        });
    }
});

// Get Single Appointment
app.get('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }
        res.json({
            success: true,
            appointment: appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching appointment',
            error: error.message
        });
    }
});

// Update Appointment Status
app.put('/api/appointments/:id', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.json({
            success: true,
            message: 'Appointment updated successfully',
            appointment: appointment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating appointment',
            error: error.message
        });
    }
});

// Delete Appointment
app.delete('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.json({
            success: true,
            message: 'Appointment deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting appointment',
            error: error.message
        });
    }
});

// Get Appointments by Status
app.get('/api/appointments/status/:status', async (req, res) => {
    try {
        const appointments = await Appointment.find({ status: req.params.status });
        res.json({
            success: true,
            count: appointments.length,
            appointments: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments',
            error: error.message
        });
    }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ERROR HANDLING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// START SERVER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}\n`);
});

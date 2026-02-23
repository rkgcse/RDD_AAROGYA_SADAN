// script.js - Updated with Backend Integration

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONFIGURATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Change this to your backend URL
const API_URL = 'http://localhost:5000/api';

// For production, use:
// const API_URL = 'https://your-production-url.com/api';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SMOOTH SCROLL FUNCTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HANDLE APPOINTMENT BOOKING (SENDS TO BACKEND)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function handleBooking(event) {
    event.preventDefault();
    
    const form = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = document.querySelector('.booking-submit');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        doctor: document.getElementById('doctor').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        reason: document.getElementById('reason').value.trim()
    };

    // Validation
    if (!validateForm(formData)) {
        return;
    }

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Booking...';

    try {
        // Send data to backend
        const response = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            // Show success message
            successMessage.innerHTML = `
                <strong>✅ Success!</strong><br>
                Your appointment has been booked successfully!<br>
                A confirmation email has been sent to ${formData.email}
            `;
            successMessage.classList.add('show');
            
            // Log to console
            console.log('Appointment booked:', data.appointment);
            
            // Reset form
            form.reset();
            
            // Hide success message after 7 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 7000);

        } else {
            // Show error
            successMessage.innerHTML = `
                <strong>❌ Error!</strong><br>
                ${data.message}
            `;
            successMessage.style.backgroundColor = '#f8d7da';
            successMessage.style.color = '#721c24';
            successMessage.style.borderColor = '#f5c6cb';
            successMessage.classList.add('show');
            
            console.error('Booking error:', data.message);
        }

    } catch (error) {
        // Network or server error
        console.error('Error:', error);
        successMessage.innerHTML = `
            <strong>❌ Connection Error!</strong><br>
            Could not connect to server. Please check your internet connection.
        `;
        successMessage.style.backgroundColor = '#f8d7da';
        successMessage.style.color = '#721c24';
        successMessage.style.borderColor = '#f5c6cb';
        successMessage.classList.add('show');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Book Appointment';
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORM VALIDATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function validateForm(formData) {
    const successMessage = document.getElementById('successMessage');

    // Check empty fields
    if (!formData.name || !formData.email || !formData.phone || !formData.doctor || !formData.date || !formData.time || !formData.reason) {
        successMessage.innerHTML = '<strong>❌ Error!</strong><br>All fields are required.';
        successMessage.style.backgroundColor = '#f8d7da';
        successMessage.style.color = '#721c24';
        successMessage.classList.add('show');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        successMessage.innerHTML = '<strong>❌ Error!</strong><br>Please enter a valid email address.';
        successMessage.style.backgroundColor = '#f8d7da';
        successMessage.style.color = '#721c24';
        successMessage.classList.add('show');
        return false;
    }

    // Phone validation (at least 10 digits)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
        successMessage.innerHTML = '<strong>❌ Error!</strong><br>Please enter a valid phone number.';
        successMessage.style.backgroundColor = '#f8d7da';
        successMessage.style.color = '#721c24';
        successMessage.classList.add('show');
        return false;
    }

    // Date validation (not in past)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        successMessage.innerHTML = '<strong>❌ Error!</strong><br>Please select a future date.';
        successMessage.style.backgroundColor = '#f8d7da';
        successMessage.style.color = '#721c24';
        successMessage.classList.add('show');
        return false;
    }

    return true;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET ALL APPOINTMENTS (ADMIN FUNCTION)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function getAllAppointments() {
    try {
        const response = await fetch(`${API_URL}/appointments`);
        const data = await response.json();
        
        if (data.success) {
            console.log('All Appointments:', data.appointments);
            return data.appointments;
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIALIZE ON PAGE LOAD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }

    // Check if backend is running
    checkBackendConnection();
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK BACKEND CONNECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function checkBackendConnection() {
    try {
        const response = await fetch(`${API_URL.replace('/api', '')}/api/health`);
        const data = await response.json();
        console.log('✅ Backend Connected:', data.message);
    } catch (error) {
        console.warn('⚠️ Backend not connected. Make sure server is running on', API_URL);
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADMIN FUNCTIONS (For future admin panel)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Get single appointment
async function getAppointment(id) {
    try {
        const response = await fetch(`${API_URL}/appointments/${id}`);
        const data = await response.json();
        return data.appointment;
    } catch (error) {
        console.error('Error fetching appointment:', error);
    }
}

// Update appointment status
async function updateAppointmentStatus(id, status) {
    try {
        const response = await fetch(`${API_URL}/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        const data = await response.json();
        return data.appointment;
    } catch (error) {
        console.error('Error updating appointment:', error);
    }
}

// Cancel appointment
async function cancelAppointment(id) {
    return updateAppointmentStatus(id, 'cancelled');
}

// Confirm appointment
async function confirmAppointment(id) {
    return updateAppointmentStatus(id, 'confirmed');
}

// Delete appointment
async function deleteAppointment(id) {
    try {
        const response = await fetch(`${API_URL}/appointments/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error deleting appointment:', error);
    }
}

// Get appointments by status
async function getAppointmentsByStatus(status) {
    try {
        const response = await fetch(`${API_URL}/appointments/status/${status}`);
        const data = await response.json();
        return data.appointments;
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

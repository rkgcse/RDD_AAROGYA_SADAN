// Smooth scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle appointment booking form submission
function handleBooking(event) {
    event.preventDefault();
    
    const form = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        doctor: document.getElementById('doctor').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        reason: document.getElementById('reason').value
    };
    
    // Log appointment data to console (in real app, send to server)
    console.log('Appointment booked:', formData);
    
    // Show success message
    successMessage.classList.add('show');
    
    // Reset form
    form.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

// Set minimum date to today in date input
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }
});

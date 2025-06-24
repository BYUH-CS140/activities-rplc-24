document.addEventListener('DOMContentLoaded', () => {
    // Get form and input elements
    const form = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Get error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('success-message');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting by default
        event.preventDefault();

        // Reset previous error/success messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        successMessage.textContent = '';
        
        let isValid = true;

        // --- Validation Logic ---

        // 1. Validate Name: Must not be empty
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name.';
            isValid = false;
        }

        // 2. Validate Email: Must be a valid email format
        // A simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '' || !emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // 3. Validate Message: Must not be empty
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please leave a message.';
            isValid = false;
        }

        // If all fields are valid, show success and submit the form
        if (isValid) {
            successMessage.textContent = 'Thank you for your feedback!';
            
            // You can uncomment the line below to actually submit the form
            // Or handle the submission with AJAX if you prefer.
            // form.submit();

            // For this example, we'll just clear the form after a short delay
            setTimeout(() => {
                form.reset();
                successMessage.textContent = '';
            }, 3000); // Reset after 3 seconds
        }
    });
});

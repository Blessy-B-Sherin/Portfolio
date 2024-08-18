
  (function () {
    "use strict";

    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent default form submission

      const form = event.target;
      const formData = new FormData(form);
      const action = form.getAttribute('action');

      // Show loading message and hide other messages
      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');

      // Send form data using fetch
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        form.querySelector('.loading').classList.remove('d-block');
        
        // Check if the response indicates success
        if (data.ok) {
          form.querySelector('.sent-message').classList.add('d-block');
          form.reset(); // Reset the form
        } else {
          // Display error message
          form.querySelector('.error-message').innerText = data.message || 'Form submission failed.';
          form.querySelector('.error-message').classList.add('d-block');
        }
      })
      .catch(error => {
        // Hide loading message and display error
        form.querySelector('.loading').classList.remove('d-block');
        form.querySelector('.error-message').innerText = error.message;
        form.querySelector('.error-message').classList.add('d-block');
      });
    }

    // Attach event listener to forms with class 'php-email-form'
    document.querySelectorAll('.php-email-form').forEach(form => {
      form.addEventListener('submit', handleFormSubmit);
    });

  })();


(() => {
  'use strict'

  console.log('Validation script loaded');

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        console.log('Form is invalid');
      } else {
        console.log('Form is valid');
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

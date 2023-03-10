// // Example starter JavaScript for disabling form submissions if there are invalid fields
//         (() => {
//           'use strict'

//         //   bsCustomFileInput.init()
        // const bsCustomFileInput = require('bs-custom-file-input');
        
//           // Fetch all the forms we want to apply custom Bootstrap validation styles to
//           const forms = document.querySelectorAll('.validated-form')
        
//           // Loop over them and prevent submission
//           Array.from(forms).forEach(form => {
//             form.addEventListener('submit', event => {
//               if (!form.checkValidity()) {
//                 event.preventDefault()
//                 event.stopPropagation()
//               }
        
//               form.classList.add('was-validated')
//             }, false)
//           })
//         })()

(function () {
    'use strict'

    // window.bsCustomFileInput = require('mdbootstrap/js/modules/bs-custom-file-input');
    // //before loading mdb js
    // require('mdbootstrap/js/mdb');

    // bsCustomFileInput.init()

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form')

    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+380\d{9}$/;
        function showError(input, message) {
            const formControl = input.parentElement;
            const errorElement = formControl.querySelector('.error-msg');
            
            formControl.classList.add('error');
            formControl.classList.remove('success');
            errorElement.textContent = message;
        }

       
        function showSuccess(input) {
            const formControl = input.parentElement;
            const errorElement = formControl.querySelector('.error-msg');
            
            formControl.classList.remove('error');
            formControl.classList.add('success');
            errorElement.textContent = '';
        }

        
        function checkName() {
            if (nameInput.value.trim() === '') {
                showError(nameInput, "Ім'я обов'язкове");
                return false;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, "Ім'я занадто коротке");
                return false;
            } else {
                showSuccess(nameInput);
                return true;
            }
        }

        
        function checkEmail() {
            if (emailInput.value.trim() === '') {
                showError(emailInput, "Email обов'язковий");
                return false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, "Некоректний формат email");
                return false;
            } else {
                showSuccess(emailInput);
                return true;
            }
        }

       
        function checkPhone() {
            if (phoneInput.value.trim() === '') {
                
                showSuccess(phoneInput);
                return true;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                showError(phoneInput, "Формат: +380XXXXXXXXX");
                return false;
            } else {
                showSuccess(phoneInput);
                return true;
            }
        }

        
        function checkMessage() {
            if (messageInput.value.trim() === '') {
                showError(messageInput, "Повідомлення обов'язкове");
                return false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, "Мінімум 10 символів");
                return false;
            } else {
                showSuccess(messageInput);
                return true;
            }
        }

        
        nameInput.addEventListener('blur', checkName);
        emailInput.addEventListener('blur', checkEmail);
        phoneInput.addEventListener('blur', checkPhone);
        messageInput.addEventListener('blur', checkMessage);

        nameInput.addEventListener('input', () => { if(nameInput.parentElement.classList.contains('error')) checkName(); });
        emailInput.addEventListener('input', () => { if(emailInput.parentElement.classList.contains('error')) checkEmail(); });
        phoneInput.addEventListener('input', () => { if(phoneInput.parentElement.classList.contains('error')) checkPhone(); });
        messageInput.addEventListener('input', () => { if(messageInput.parentElement.classList.contains('error')) checkMessage(); });

    
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const isNameValid = checkName();
            const isEmailValid = checkEmail();
            const isPhoneValid = checkPhone();
            const isMessageValid = checkMessage();

            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
               
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    message: messageInput.value.trim(),
                    date: new Date().toISOString()
                };

                
                let submissions = JSON.parse(localStorage.getItem('spikepoint_messages')) || [];
                submissions.push(formData);
                localStorage.setItem('spikepoint_messages', JSON.stringify(submissions));

            
                if (window.showToast) {
                    window.showToast('Ваше повідомлення успішно відправлено!', 'success');
                } else {
                    
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Відправлено! ✓';
                    submitBtn.style.backgroundColor = '#28a745';
                    
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                }

                
                contactForm.reset();
                document.querySelectorAll('.form-control').forEach(el => el.classList.remove('success'));
            }
        });
    }
});

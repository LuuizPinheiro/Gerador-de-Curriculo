function addSkill() {
    const skillsDiv = document.getElementById('skills');
    const newSkill = document.createElement('div');
    newSkill.classList.add('form-group');
    newSkill.innerHTML = '<input type="text" class="form-control" name="skill" required><div class="invalid-feedback">Por favor, insira uma habilidade.</div>';
    skillsDiv.appendChild(newSkill);
}

function addExperience() {
    const experiencesDiv = document.getElementById('experiences');
    const newExperience = document.createElement('div');
    newExperience.classList.add('form-group');
    newExperience.innerHTML = '<textarea class="form-control" name="experience" rows="3" required></textarea><div class="invalid-feedback">Por favor, insira uma experiência.</div>';
    experiencesDiv.appendChild(newExperience);
}

function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100px';
            img.style.display = 'block';
            img.style.margin = '10px 0';
            const photoGroup = document.querySelector('.form-group input[type="file"]').parentNode;
            if (photoGroup.querySelector('img')) {
                photoGroup.removeChild(photoGroup.querySelector('img'));
            }
            photoGroup.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function generateResume() {
    const resumeContent = document.getElementById('resume-content');
    resumeContent.innerHTML = '';

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const photoInput = document.getElementById('photo');
    let photoHTML = '';

    if (photoInput.files && photoInput.files[0]) {
        const file = photoInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            photoHTML = `<img src="${e.target.result}" style="max-width: 100px; display: block; margin: 10px 0;">`;
            displayResume(name, age, email, phone, photoHTML);
        };
        reader.readAsDataURL(file);
    } else {
        displayResume(name, age, email, phone, photoHTML);
    }
}

function displayResume(name, age, email, phone, photoHTML) {
    const resumeContent = document.getElementById('resume-content');
    const personalInfo = `
        <h3>Dados Pessoais</h3>
        ${photoHTML}
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Idade:</strong> ${age}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
    `;
    resumeContent.innerHTML += personalInfo;

    const skills = document.getElementsByName('skill');
    if (skills.length > 0) {
        let skillsHTML = '<h3>Habilidades</h3><ul>';
        for (let skill of skills) {
            if (skill.value) {
                skillsHTML += `<li>${skill.value}</li>`;
            }
        }
        skillsHTML += '</ul>';
        resumeContent.innerHTML += skillsHTML;
    }

    const experiences = document.getElementsByName('experience');
    if (experiences.length > 0) {
        let experiencesHTML = '<h3>Experiências</h3>';
        for (let experience of experiences) {
            if (experience.value) {
                experiencesHTML += `<p>${experience.value}</p>`;
            }
        }
        resumeContent.innerHTML += experiencesHTML;
    }

    document.getElementById('resume').classList.remove('hidden');
}

function printResume() {
    const resume = document.getElementById('resume');
    const form = document.querySelector('.container.no-print');

    form.classList.add('hidden');
    window.print();
    form.classList.remove('hidden');
}

// Bootstrap form validation
(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
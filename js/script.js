const detailButtons = document.querySelectorAll('.details-toggle');

for (const button of detailButtons) {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    const isHidden = target.hasAttribute('hidden');

    if (isHidden) {
      target.removeAttribute('hidden');
      button.textContent = 'Ocultar detalle';
    } else {
      target.setAttribute('hidden', 'hidden');
      button.textContent = 'Mostrar detalle';
    }
  });
}

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'Tema claro' : 'Tema oscuro';
  });
}

const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = {
      nombre: form.querySelector('#nombre'),
      correo: form.querySelector('#correo'),
      mensaje: form.querySelector('#mensaje')
    };

    let isValid = true;

    for (const [key, input] of Object.entries(fields)) {
      const errorElement = document.querySelector(`[data-error-for="${key}"]`);
      let message = '';

      if (!input.value.trim()) {
        message = 'Este campo es obligatorio.';
        isValid = false;
      } else if (key === 'correo' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        message = 'Ingrese un correo válido.';
        isValid = false;
      } else if (key === 'nombre' && input.value.trim().length < 2) {
        message = 'Debe tener al menos 2 caracteres.';
        isValid = false;
      } else if (key === 'mensaje' && input.value.trim().length < 10) {
        message = 'El mensaje debe tener al menos 10 caracteres.';
        isValid = false;
      }

      input.classList.toggle('input-invalid', Boolean(message));
      errorElement.textContent = message;
    }

    if (!isValid) {
      statusMessage.textContent = 'Corrija los errores del formulario.';
      statusMessage.className = 'form-status error';
      return;
    }

    statusMessage.textContent = 'Mensaje enviado correctamente.';
    statusMessage.className = 'form-status success';
    form.reset();
  });
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const navLinks = document.querySelectorAll('.nav-inner a');
for (const link of navLinks) {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
}

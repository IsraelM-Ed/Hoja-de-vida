const themeToggle = document.querySelector('.theme-toggle');
const themeStorageKey = 'israel-cv-theme';

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.textContent = isDark ? 'Tema claro' : 'Tema oscuro';
  themeToggle.setAttribute('aria-pressed', String(isDark));
};

if (themeToggle) {
  try {
    const storedTheme = localStorage.getItem(themeStorageKey);
    const theme = storedTheme ? JSON.parse(storedTheme) : 'light';

    if (theme === 'light' || theme === 'dark') {
      applyTheme(theme);
    } else {
      console.warn('La preferencia de tema guardada no es válida; se usará el tema claro.');
      applyTheme('light');
    }
  } catch (error) {
    console.warn('No se pudo restaurar la preferencia de tema guardada.', error);
    applyTheme('light');
  }

  themeToggle.addEventListener('click', () => {
    const theme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(theme);

    try {
      localStorage.setItem(themeStorageKey, JSON.stringify(theme));
    } catch (error) {
      console.error('No se pudo guardar la preferencia de tema.', error);
    }
  });
}

const siteNav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileNavigation = window.matchMedia('(max-width: 1024px)');

const configureNavigation = () => {
  const isCollapsible = mobileNavigation.matches;
  siteNav.classList.toggle('is-collapsible', isCollapsible);
  navToggle.hidden = !isCollapsible;
  navToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
};

if (siteNav && navToggle) {
  configureNavigation();
  mobileNavigation.addEventListener('change', configureNavigation);

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');

      if (mobileNavigation.matches) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('.details-toggle');
  if (!button) {
    return;
  }

  const target = document.getElementById(button.dataset.target);
  if (!target) {
    console.error(`No existe el detalle de proyecto "${button.dataset.target}".`);
    return;
  }

  const isOpening = target.hidden;
  target.hidden = !isOpening;
  button.textContent = isOpening ? 'Ocultar detalle' : 'Mostrar detalle';
  button.setAttribute('aria-expanded', String(isOpening));
});

const projectSearch = document.querySelector('#project-search');
const projectCount = document.querySelector('#project-count');
const projects = Array.from(document.querySelectorAll('[data-project]'), (element) => ({
  element,
  searchableText: element.textContent.toLocaleLowerCase('es')
}));

const normalizeText = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es')
  .trim();

if (projectSearch && projectCount) {
  projectSearch.addEventListener('input', () => {
    const query = normalizeText(projectSearch.value);
    const visibleProjects = projects
      .filter(({ searchableText }) => normalizeText(searchableText).includes(query))
      .map(({ element }) => element);

    projects.forEach(({ element }) => {
      element.hidden = !visibleProjects.includes(element);
    });

    projectCount.textContent = visibleProjects.length === projects.length
      ? `Se muestran todos los proyectos (${projects.length}).`
      : `${visibleProjects.length} de ${projects.length} proyectos encontrados.`;
  });
}

const form = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#form-status');
const formFields = form ? Array.from(form.querySelectorAll('input, textarea')) : [];

const validateField = (field) => {
  const errorElement = form.querySelector(`[data-error-for="${field.name}"]`);
  const value = field.value.trim();
  let message = '';

  field.setCustomValidity('');

  if (!value && field.required) {
    message = 'Este campo es obligatorio.';
  } else if (field.name === 'nombre' && value.length < 2) {
    message = 'Debe tener al menos 2 caracteres.';
  } else if (field.name === 'correo' && field.validity.typeMismatch) {
    message = 'Ingrese un correo electrónico válido.';
  } else if (field.name === 'mensaje' && value.length < 10) {
    message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  if (message) {
    field.setCustomValidity(message);
  }

  field.classList.toggle('input-invalid', Boolean(message));
  field.setAttribute('aria-invalid', String(Boolean(message)));
  errorElement.textContent = message;
  return !message;
};

if (form && statusMessage) {
  formFields.forEach((field) => {
    field.addEventListener('input', () => {
      validateField(field);
      statusMessage.textContent = '';
      statusMessage.className = 'form-status';
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fieldsAreValid = formFields.map(validateField).every(Boolean);
    const isValid = fieldsAreValid && form.checkValidity();

    if (!isValid) {
      statusMessage.textContent = 'Corrige los campos indicados antes de continuar.';
      statusMessage.className = 'form-status error';
      form.reportValidity();
      return;
    }

    statusMessage.textContent = 'Formulario validado. Este sitio de demostración no envía datos a un servidor.';
    statusMessage.className = 'form-status success';
    form.reset();
    formFields.forEach((field) => {
      field.classList.remove('input-invalid');
      field.setAttribute('aria-invalid', 'false');
      field.setCustomValidity('');
      form.querySelector(`[data-error-for="${field.name}"]`).textContent = '';
    });
  });
}

const githubForm = document.querySelector('#github-form');
const githubStatus = document.querySelector('#github-status');
const githubRepositories = document.querySelector('#github-repositories');
const githubUsernameInput = document.querySelector('#github-username');

const setGitHubState = (state, message) => {
  githubStatus.dataset.state = state;
  githubStatus.textContent = message;
};

const loadGitHubRepositories = async (username) => {
  setGitHubState('loading', 'Cargando repositorios públicos...');
  githubRepositories.replaceChildren();

  try {
    const endpoint = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=3`;
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/vnd.github+json' }
    });

    if (!response.ok) {
      const statusMessages = {
        400: 'La solicitud a GitHub no es válida (HTTP 400).',
        404: `No se encontró el perfil "${username}" en GitHub (HTTP 404).`,
        500: 'GitHub reportó un error interno (HTTP 500).'
      };
      throw new Error(statusMessages[response.status] || `GitHub respondió con HTTP ${response.status}.`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new TypeError('La respuesta de GitHub no contiene una lista de repositorios.');
    }

    const items = repositories.map((repository) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const description = document.createElement('p');
      const descriptionText = repository.description || 'Sin descripción disponible.';

      link.href = repository.html_url;
      link.textContent = repository.name;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      description.textContent = descriptionText;
      item.append(link, description);
      return item;
    });

    githubRepositories.replaceChildren(...items);
    setGitHubState('success', `${repositories.length} repositorio(s) público(s) cargado(s).`);
  } catch (error) {
    console.error('No se pudieron cargar los repositorios de GitHub.', error);
    setGitHubState('error', `No se pudieron cargar los repositorios. ${error.message}`);
  }
};

if (githubForm && githubStatus && githubRepositories && githubUsernameInput) {
  githubForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = githubUsernameInput.value.trim();

    if (!githubUsernameInput.checkValidity()) {
      setGitHubState('error', 'Ingresa un nombre de usuario válido de GitHub.');
      githubUsernameInput.reportValidity();
      return;
    }

    loadGitHubRepositories(username);
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
  yearElement.dateTime = String(new Date().getFullYear());
}

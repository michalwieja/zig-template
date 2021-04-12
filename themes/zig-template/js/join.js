// import { validateMail, validateNonExistent } from './validator';

const next = document.getElementById('next-button');
const prev = document.getElementById('prev-button');
const pb_el = document.querySelectorAll('.progress-bar__element');
const steps = document.querySelectorAll('.step');
const first_form = document.getElementById('regulations');
const join_form = document.getElementById('join-form');
const contributions_row = document.querySelectorAll('.contributions__row');
const register_fields = document.querySelectorAll('.text-input__input');
const close_modal_button = document.getElementById('close-modal-button');
let step = 0;

const body_factory = {
  selected_contribution: null,
  email: null,
  password: null,
  name: null,
};

const user = {
  ...body_factory,
};

const error = {
  ...body_factory,
};

close_modal_button.addEventListener('click', () => {
  document.querySelector('html').classList.remove('modal-open');
  document.getElementById('um-submit-btn').click();
});
next.addEventListener('click', () => handleFormButtonClick(1));
prev.addEventListener('click', () => handleFormButtonClick(-1));
contributions_row.forEach(el => {
  el.addEventListener('click', () => handleContributionClick());
});

register_fields.forEach(input => {
  input.addEventListener('input', (el) => handleInputInput(el));
  input.addEventListener('focus', (el) => handleInputFocus(el, true));
  input.addEventListener('blur', (el) => handleInputFocus(el, false));
});

const validateStepRegulations = () => {
  if (!user.selected_contribution) {
    error.selected_contribution = 'Proszę wybrać wysokość składki';
    contributions_row.forEach(el => el.classList.add('error'));
    next.classList.add('disabled');
  } else {
    error.selected_contribution = null;
    next.classList.remove('disabled');
    contributions_row.forEach(el => el.classList.remove('error'));
  }
  return error.selected_contribution;
};

const validateStepDeclaration = (field = null, value = null) => {
  if (field === 'email') {
    error.email = !validateNonExistent(value || user.email)
      ? 'Pole nie może być puste'
      : !validateMail(value || user.email) ? 'Email nie jest poprawny' : null;
  } else if (field) {
    error[field] = !validateNonExistent(value || user[field]) ? 'Pole nie może być puste' : null;
  } else {
    error.email = !validateNonExistent(user.email)
      ? 'Pole nie może być puste'
      : !validateMail(user.email) ? 'Email nie jest poprawny' : null;
    error.name = !validateNonExistent(user.name) ? 'Pole nie może być puste' : null;
    error.password = !validateNonExistent(user.password) ? 'Pole nie może być puste' : null;
  }

  Object.entries(error).forEach(([k, v]) => {
    const element = document.getElementById(`${k}-input`);
    const element_error = document.getElementById(`${k}-error`);
    if (v && element) {
      element.classList.add('error');
    } else if (element) {
      element.classList.remove('error');
    }
    if (element_error) {
      element_error.innerHTML = v;
    }
  });
};

const handleInputFocus = (el, focus) => {
  if (focus) {
    el.target.parentElement.classList.add('focus');
  } else {
    validateStepDeclaration(el.target.name);
    el.target.parentElement.classList.remove('focus');
  }
};
const handleInputInput = (el) => {
  validateStepDeclaration(el.target.name, el.target.value);
  const res = !Object.values(error).every(el => !el);
  if (res) {
    next.classList.add('disabled');
  } else {
    next.classList.remove('disabled');
  }
  if (el.target.value) {
    user[el.target.name] = el.target.value;
    el.target.parentElement.classList.add('has-value');
  } else {
    el.target.parentElement.classList.remove('has-value');
  }
};

const handleContributionClick = () => {
  const radios = document.querySelectorAll('input[name=contribution_size]');
  radios.forEach(el => {
    const sibling = el.nextElementSibling;
    if (el.checked) {
      user.selected_contribution = el.value;
      sibling.classList.add('active');
    } else {
      sibling.classList.remove('active');
    }
  });
  validateStepRegulations();
};

const handleFormButtonClick = (action) => {
  let has_errors = false;
  if (step === 1) {
    has_errors = validateStepRegulations();
  } else if (step === 2) {
    validateStepDeclaration();
    has_errors = !Object.values(error).every(el => !el);
  }
  if (has_errors) {
    next.classList.add('disabled');
    return;
  }
  next.classList.remove('disabled');
  setActiveStep(action);
  generateButtons();
};

const generateButtons = () => {
  switch (step) {
    case 0: {
      prev.style.opacity = 0;
      return;
    }
    case 2: {
      next.innerText = 'Wyślij deklarację';
      return;
    }
    default: {
      prev.style.opacity = 1;
      next.style.opacity = 1;
      next.innerText = 'Akceptuję i przechodzę dalej';
      return;
    }
  }
};

const fillJoinForm = () => {
  const name = document.getElementById('name-254');
  const email = document.getElementById('user_email-254');
  const password = document.getElementById('user_password-254');
  const selected_contribution = document.getElementById('membership-level-254');

  name.value = user.name;
  email.value = user.email;
  password.value = user.password;
  selected_contribution.value = user.selected_contribution;
};

const setActiveStep = (action) => {
  if (step + action < 0 || step + action > 4) return;
  step += action;
  if (step < 0 || step > 4) return;
  if (step === 3) {
    fillJoinForm();
    document.querySelector('html').classList.add('modal-open')
  }
  pb_el.forEach((el, index) => {
    if (index < step) {
      el.classList.remove('active');
      el.classList.add('past');
      return;
    }
    if (index === step) {
      el.classList.remove('past');
      el.classList.add('active');
      return;
    }
    if (index > step) {
      el.classList.remove('active');
    }
  });
  steps.forEach((el, index) => {
    if (index === step) {
      el.style.maxHeight = 'unset';
    } else {
      el.style.maxHeight = 0;
    }
  });
  join_form.scrollTop = 0;
  first_form.style.marginLeft = `${-(step * 1000)}px`;
};

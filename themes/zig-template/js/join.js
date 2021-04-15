const next = document.getElementById('next-button');
const prev = document.getElementById('prev-button');
const pb_el = document.querySelectorAll('.progress-bar__element');
const steps = document.querySelectorAll('.step');
const first_form = document.getElementById('regulations');
const join_form = document.getElementById('join-form');
const contributions_row = document.querySelectorAll('.contributions__row');
const register_fields = document.querySelectorAll('.text-input__input');
const close_modal_button = document.getElementById('close-modal-button');
const error_list = document.querySelectorAll('.um-field-error');
const post_message = document.querySelector('.um-postmessage');
const form_error = document.getElementById('form-error');

const form_id = 291;
let step = 0;
let request_errors = [];

const body_factory = {
  contribution_proposal: null,
  entry_fee: null,
  monthly_fee: null,
  username: null,
  user_password: null,
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
  window.location.href = '/'; // TODO
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
  if (!(user.contribution_proposal && user.entry_fee && user.monthly_fee)) {
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

const validateStepDeclaration = (field = null, value = null, custom_error = null) => {
  if (custom_error) {
    error[field] = custom_error;
  } else if (field === 'username') {
    error.username = !validateNonExistent(value || user.username)
      ? 'Pole nie może być puste'
      : !validateMail(value || user.username) ? 'Email nie jest poprawny' : null;
  } else if (field) {
    error[field] = !validateNonExistent(value || user[field]) ? 'Pole nie może być puste' : null;
  } else {
    error.username = !validateNonExistent(user.username)
      ? 'Pole nie może być puste'
      : !validateMail(user.username) ? 'Email nie jest poprawny' : null;
    error.name = !validateNonExistent(user.name) ? 'Pole nie może być puste' : null;
    error.user_password = !validateNonExistent(user.user_password) ? 'Pole nie może być puste' : null;
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
      user.contribution_proposal = el.value.split('|')[0];
      user.entry_fee = el.value.split('|')[1];
      user.monthly_fee = el.value.split('|')[2];
      sibling.classList.add('active');
    } else {
      sibling.classList.remove('active');
    }
  });
  validateStepRegulations();
};

const handleFormButtonClick = (action) => {
  if (action < 0) {
    if (step + action < 0) return;
    setActiveStep(action);
  }
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

const generateError = (msg) => {
  if (msg.includes('username is already taken') || msg.includes('email is already linked to an existing account')) {
    return 'Użytkownik z takim adresem email już istnieje';
  }
  if (msg.includes('required')) {
    return 'Pole jest wymagane';
  }
  return 'Wartość nie jest poprawna';
};

const fillJoinForm = () => {
  const name = document.getElementById(`name-${form_id}`);
  const username = document.getElementById(`username-${form_id}`);
  const user_password = document.getElementById(`user_password-${form_id}`);
  const contribution_proposal = document.getElementById(`contributions_proposal-${form_id}`);
  const entry_fee = document.getElementById(`entry_fee-${form_id}`);
  const monthly_fee = document.getElementById(`monthly_fee-${form_id}`);

  name.value = user.name;
  username.value = user.username;
  user_password.value = user.user_password;
  contribution_proposal.value = user.contribution_proposal;
  entry_fee.value = user.entry_fee;
  monthly_fee.value = user.monthly_fee;

  document.getElementById('um-submit-btn').click();
};

const fillInput = (val, el) => {
  if (val) {
    el.value = val;
    el.parentElement.classList.add('has-value');
  } else {
    el.parentElement.classList.remove('has-value');
  }
};

const getDataFromForm = () => {
  const name = document.getElementById(`name-${form_id}`);
  const name_input = document.getElementById('input-name-input');
  const username = document.getElementById(`username-${form_id}`);
  const username_input = document.getElementById('input-username-input');

  user.name = name.value;
  fillInput(name.value, name_input);
  user.username = username.value;
  fillInput(username.value, username_input);
};

const checkForErrors = () => {
  if (error_list && error_list.length) {
    form_error.innerText = 'Wystąpił błąd - uzupełnij formularz ponownie';
    form_error.classList.add('visible');
    request_errors = [...error_list].map((err) => ({
      field: err.parentElement.id.replace(`um_field_${form_id}_`, ''),
      message: generateError(err.innerText)}));
    getDataFromForm();
    setActiveStep(1);
    request_errors.forEach((err) => {
      validateStepDeclaration(err.field, null, err.message);
    });
    return;
  } else if (post_message) {
    document.querySelector('html').classList.add('modal-open');
  } else {
    request_errors = [];
  }
  form_error.innerText = '';
  form_error.classList.remove('visible');
};

const setActiveStep = (action) => {
  if (step + action > 4) return;
  step += action;
  if (step < 0 || step > 4) return;
  next.classList.remove('disabled');
  if (step === 3) {
    fillJoinForm();
    next.classList.add('disabled');
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

checkForErrors();

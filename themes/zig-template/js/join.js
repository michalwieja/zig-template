const next = document.getElementById('next-button');
const prev = document.getElementById('prev-button');
const pb_el = document.querySelectorAll('.progress-bar__element');
const steps = document.querySelectorAll('.step');
const first_form = document.getElementById('regulations');
const join_form = document.getElementById('join-form');
const contributions_row = document.querySelectorAll('.contributions__row');
const register_fields = document.querySelectorAll('.text-input__input');
let step = 0;

const user = {
  selected_contribution: null,
};

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

const handleInputFocus = (el, focus) => {
  if (focus) {
    el.target.parentElement.classList.add('focus');
  } else {
    el.target.parentElement.classList.remove('focus');
  }
};
const handleInputInput = (el) => {
  if (el.target.value) {
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
      sibling.classList.add('active');
    } else {
      sibling.classList.remove('active');
    }
  });
};

const handleFormButtonClick = (action) => {
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

const setActiveStep = (action) => {
  if (step + action < 0 || step + action > 4) return;
  step += action;
  if (step < 0 || step > 4) return;
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

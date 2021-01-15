/* =============================================================================

============================================================================= */


const form1                     = document.getElementById('form-1');
const firstNameInput            = form1['first-name-input'];
const lastNameInput             = form1['last-name-input'];
const emailInput                = form1['email-input'];

const imageFileInput            = form1['image-file-input'];
const imagePreviewContainer     = document.querySelector('.image-preview-container');
const previewImg                = document.getElementById('preview-img');
let pictureUrl                  = 'assets/add-photo.svg';

const passwordInput             = form1['password-input'];
const passwordConfirmationInput = form1['password-confirmation-input'];
const select1                   = form1['select-1'];
const select2                   = form1['select-2'];
const checkBoxGroup1            = form1.querySelectorAll('.checkbox-group-1 [type="checkbox"]');
const radioGroup1               = form1.elements.radio_group_1; //This is the best way to do it in order to get the single value later on.

const textarea1                 = form1['textarea-1'];
const textArea1Count            = document.getElementById('texarea-1-count');

const termsCheck                = form1['terms-check'];

const form1SubmitButton         = document.getElementById('form-1-submit-button');
const form1SubmitButtonText     = form1SubmitButton.querySelector('.submit-button-text');
const form1SubmitSpinner        = form1SubmitButton.querySelector('.spinner-border');



/* =============================================================================

============================================================================= */


function getMultipleSelectValues(select){
  const selectValues = Array.from(
    select.querySelectorAll("option:checked"),
    (option) => option.value
  );
  return selectValues;
}


/* =============================================================================

============================================================================= */


function getMultipleCheckedValues(checkboxes){
  const checkedValues = [];
  for (let i = 0; i < checkboxes.length; i++) {
   const checkbox = checkboxes[i];
   (checkbox.checked) ? checkedValues.push(checkbox.value) : null;
 }
 return checkedValues;
}


/* =============================================================================

============================================================================= */


function hasWhiteSpace(string){
  return string.indexOf(' ') >= 0;
}


/* =============================================================================

============================================================================= */


function valuesMatch(value1, value2){
  if (value1 !== value2){ return false; }
  return true;
}


/* =============================================================================

============================================================================= */


function hasCorrectExtension(input, regex=/\.(jpe?g|png|gif)$/i) {
  const files = input.files;

  for (let i = 0; i < files.length; i++){
    const file               = files[i];
    const extensionIsCorrect = regex.test(file.name);
    if (!extensionIsCorrect){
      return false;
    }
  }
  return true;
}


/* =============================================================================

============================================================================= */


function hasCorrectSize(input, size){
  const files = input.files;

  for (let i = 0; i < files.length; i++){
    const file = files[i];
    if (file.size > size){ return false; }
  }
  return true;
}


/* =============================================================================

============================================================================= */


// function radiosHaveValue(radios){
//   for (let i = 0; i < radios.length; i++){
//     const radio = radios[i];
//     if (radio.checked){ return true; }
//   }
//   return false;
// }


/* =============================================================================

============================================================================= */


function checkboxesHaveValue(checkboxes){
  for (let i = 0; i < checkboxes.length; i++){
    const checkbox = checkboxes[i];
    if (checkbox.checked){ return true; }
  }
  return false;
}


/* =============================================================================

============================================================================= */


function validateFirstName(input){
  const validityObject = input.validity;
  let invalidFeedbackMessage = 'Must be between 1 and 25 characters with no spaces.';

  if (input.value.trim().length === 0){
    invalidFeedbackMessage = "First name is required!";
    input.setCustomValidity(invalidFeedbackMessage);
  }

  else if (input.value.length > 25){
    invalidFeedbackMessage = "First name must not exceed 25 characters.";
    input.setCustomValidity(invalidFeedbackMessage);
  }

  else if (hasWhiteSpace(input.value)){
    invalidFeedbackMessage = "First name must not contain spaces!";
    input.setCustomValidity(invalidFeedbackMessage);
  }

  else {
    input.setCustomValidity('');
    invalidFeedbackMessage = '';
  }

  input.parentElement.querySelector('.invalid-feedback').textContent = invalidFeedbackMessage;

  return validityObject.valid;
}


/* =============================================================================

============================================================================= */


function validatePasswordConfirmation(passwordInput, passwordConfirmationInput){
  const validityObject       = passwordConfirmationInput.validity;
  let invalidFeedbackMessage = 'Password confirmation required! Passwords must match';

  if (validityObject.valueMissing){
    invalidFeedbackMessage = "Password confirmation required!";
    passwordConfirmationInput.setCustomValidity(invalidFeedbackMessage);
  }

  else if (passwordConfirmationInput.value.length < 6){
    invalidFeedbackMessage = "Must be at least 6 characters!";
    passwordConfirmationInput.setCustomValidity(invalidFeedbackMessage);
  }

  else if (!valuesMatch(passwordInput.value, passwordConfirmationInput.value)){
    invalidFeedbackMessage = "The passwords must match.";
    passwordConfirmationInput.setCustomValidity(invalidFeedbackMessage);
  }
   else {
     passwordConfirmationInput.setCustomValidity('');
     invalidFeedbackMessage = '';
   }

   passwordConfirmationInput.parentElement.querySelector('.invalid-feedback').textContent = invalidFeedbackMessage;

   return validityObject.valid;
}


/* =============================================================================

============================================================================= */


function validateFile(input){
  const file                 = input.files[0];
  const maxFileSize          = 100000; //Arbitrary number in bytes.
  const validityObject       = input.validity;
  let invalidFeedbackMessage = 'Image required.';

  if (validityObject.valueMissing){
    invalidFeedbackMessage = "An image is required!";
    input.setCustomValidity(invalidFeedbackMessage);
  }

  else if (file && !hasCorrectExtension(input, /\.(jpe?g|png|gif)$/i)){
    invalidFeedbackMessage = "The file must me a .jpeg, .png., or .gif!";
    input.setCustomValidity(invalidFeedbackMessage);
  }

  else if (file && !hasCorrectSize(input, maxFileSize)){
    //Note: a GB is 1073741824 bytes
    invalidFeedbackMessage = `${file.name} exceeds the arbitrary size limit of ${maxFileSize} bytes.`;
    input.setCustomValidity(invalidFeedbackMessage);
  }

  else {
    input.setCustomValidity('');
    invalidFeedbackMessage = '';
  }

  input.parentElement.querySelector('.invalid-feedback').textContent = invalidFeedbackMessage;

  return validityObject.valid;
}


/* =============================================================================

============================================================================= */


function setPictureUrl(file){
  if (!imagePreviewContainer.classList.contains('image-selected')){
    imagePreviewContainer.classList.add('image-selected');
  }

  if (pictureUrl.startsWith('blob:')){
    URL.revokeObjectURL(pictureUrl);
  }

  pictureUrl = URL.createObjectURL(file);
  previewImg.setAttribute('src', pictureUrl);
}


/* =============================================================================

============================================================================= */


function resetImage(){
  imagePreviewContainer.classList.remove('image-selected');
  pictureUrl = 'assets/add-photo.svg';
  previewImg.setAttribute('src', pictureUrl);
}


/* =============================================================================

============================================================================= */
//Note: This function is actually getting called on the imagePreviewContainer.


function handlePictureClick(){
  imageFileInput.click();
}


/* =============================================================================

============================================================================= */


function handleTextareaInput(){
  const maxLength = parseInt(textarea1.getAttribute('maxlength'));
  const length    = textarea1.value.length;
  const warning   = 0.8;
  const danger    = 1;

  if (length > 0){
    textArea1Count.classList.remove('d-none');
    textArea1Count.textContent = "Count: " + length;
  } else {
    textArea1Count.classList.add('d-none');
    textArea1Count.textContent = "";
  }

  if ((length / maxLength) >= danger){
    textArea1Count.classList.remove('text-warning');
    textArea1Count.classList.add('text-danger');
  } else if ((length / maxLength) > warning){
    textArea1Count.classList.remove('text-danger');
    textArea1Count.classList.add('text-warning');
  } else {
    textArea1Count.classList.remove('text-warning');
    textArea1Count.classList.add('text-success');
  }
}


/* =============================================================================
                           Event Listeners
============================================================================= */


checkBoxGroup1.forEach(checkbox => {
  checkbox.addEventListener('change', function(){
    if (checkboxesHaveValue(checkBoxGroup1)){
      checkBoxGroup1.forEach(checkbox => checkbox.removeAttribute('required'));
    } else {
      checkBoxGroup1.forEach(checkbox => checkbox.setAttribute('required', ""));
    }
  });
});


/* =============================================================================

============================================================================= */


form1.addEventListener('submit', function(e){
  console.log("A 'submit' event was fired.");

  e.preventDefault();
  e.stopPropagation();
  e.target.classList.add('was-validated');


  validateFirstName(e.target['first-name-input']);
  validatePasswordConfirmation(e.target['password-input'], e.target['password-confirmation-input']);
  validateFile(imageFileInput);


  //This could be improved by abstracting it into a validateCheckboxes() function.
  const checkBoxGroup1Checked = checkboxesHaveValue(checkBoxGroup1);
  if (!checkBoxGroup1Checked){
    checkBoxGroup1.forEach(checkbox => checkbox.setAttribute('required', ""));
  }

  /* =============================
  Check if form is valid then get values.
  ============================= */


  const formIsValid = this.checkValidity();


  if (formIsValid){
    //Disable submit button while submitting and show spinner
    form1SubmitButton.setAttribute("disabled", "");
    form1SubmitButtonText.textContent = "SUBMITTING...";
    form1SubmitSpinner.classList.remove('d-none');


    const firstNameValue    = firstNameInput.value;
    const lastNameValue     = lastNameInput.value;
    const emailValue        = emailInput.value;
    const imageFile         = imageFileInput.files[0];  //console.log("imageFile is Blob: ", imageFile instanceof Blob); // true
    const passwordValue     = passwordInput.value;
    const select1Value      = select1.value;
    const select2Values     = getMultipleSelectValues(select2);
    const checkGroup1Values = getMultipleCheckedValues(checkBoxGroup1);
    const radioGroup1Value  = radioGroup1.value;
    const textarea1Value    = textarea1.value;
    const termsCheckValue  = (termsCheck.checked) ? termsCheck.value : "No"; //Should never be "No" since it's required.

    console.log({
      firstName:   firstNameValue,
      lastName:    lastNameValue,
      email:       emailValue,
      image:       imageFile,
      password:    passwordValue,
      select1:     select1Value,
      select2:     select2Values,
      checkGroup1: checkGroup1Values,
      radioGroup1: radioGroup1Value,
      textarea1:   textarea1Value,
      termsCheck:  termsCheckValue
    });


    /* =============================
    Send values as FormData: https://developer.mozilla.org/en-US/docs/Web/API/FormData
    ============================= */


    //Simulate successful form submission after 2 seconds clear all values, remove .was-validated, etc.
    setTimeout(function(){
      e.target.classList.remove('was-validated');
      e.target.reset();
      resetImage();
      handleTextareaInput();

      //Enable submit button and hide spinner.
      form1SubmitButton.removeAttribute("disabled");
      form1SubmitButtonText.textContent = "SUBMIT";
      form1SubmitSpinner.classList.add('d-none');
    }, 3000);
  }


  else {
    console.log("Not all form fields are valid. Preventing submission.");
  }
});


/* =============================================================================

============================================================================= */


form1['show-password-button'].addEventListener('click', function(e){
  try {
    if (passwordInput.type === 'password'){
      passwordInput.type = 'text';
      e.target.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      e.target.textContent = 'Show';
    }
  } catch(err){
    console.error('This browser cannot switch input type.');
  }
});


form1['show-password-confirmation-button'].addEventListener('click', function(e){
  try {
    if (passwordConfirmationInput.type === 'password'){
      passwordConfirmationInput.type = 'text';
      e.target.textContent = 'Hide';
    } else {
      passwordConfirmationInput.type = 'password';
      e.target.textContent = 'Show';
    }
  } catch(err){
    console.error('This browser cannot switch input type.');
  }
});


/* =============================================================================

============================================================================= */


form1['textarea-1'].addEventListener('input', handleTextareaInput);




form1['first-name-input'].addEventListener('input', function(){ validateFirstName(this); });




form1['image-file-input'].addEventListener('change', function(e){
  validateFile(this);

  if (this.files.length > 0){
    const file = this.files[0];
    setPictureUrl(file);
  }
});




form1['password-input'].addEventListener('input', function(){
  validatePasswordConfirmation(passwordInput, passwordConfirmationInput);
});




form1['password-confirmation-input'].addEventListener('input', function(){
  validatePasswordConfirmation(passwordInput, passwordConfirmationInput);
});


//This works in conjunction with the following CSS to give error styles to image:
//.was-validated input:invalid ~ .image-preview-container { border-color: #dc3545; }
form1['image-file-input'].addEventListener('invalid', function(){
  pictureUrl = 'assets/add-photo-invalid.svg';
  previewImg.setAttribute('src', pictureUrl);
});




imagePreviewContainer.addEventListener('click', handlePictureClick);




textarea1.style.height = select2.offsetHeight + 'px';

import {errorTags, formContent, formData, modalCloseBtn, submitBtn, validationMessage} from './modal.js';

const emailErrorMessage = 'Votre email n\'est pas valide';
const stringErrorMessage = 'Veuillez entrer minimum 2 caractères pour votre identité';
const optionErrorMessage = 'Vous devez choisir une option';
const termsErrorMessage = 'Vous devez accepter les termes et conditions';
const birthErrorMessage = 'Vous date de naissance n\'est pas valide pour l\'inscription';
const unknownErrorMessage = 'Votre forumlaire contient des données inappropriées. Veuillez recommencer la saisie.';
const numberErrorMessage = 'Vous devez rensienger votre nombre de participation';
const yearMax = new Date().getFullYear() - 18;
const yearMin = new Date().getFullYear() - 99;


// get data in an Array
// dispatch them in appropriate condition to pass control depending on the type
// send error if necessary
const controlData = () => {
    let isFormValid = true;

    const locations = {
        type: 'radio',
        locationsArray: [...document.querySelectorAll('#locations > input')]
    };

    const data = [...document.querySelectorAll('.formData input[type]:not([type="radio"])'), locations];

    for (let i of data) {

        switch (i.type) {

            case 'text' :
                const isAvailableString = /^[a-zA-Z]{2,}$/.test(i.value);
                if (!isAvailableString) {
                    isFormValid = false;
                    sendError(i.id, stringErrorMessage);
                }
                break;

            case 'email' :
                const isAvailableEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/.test(i.value);
                if (!isAvailableEmail) {
                    isFormValid = false;
                    sendError(i.id, emailErrorMessage);
                }
                break;

            case 'number' :
                if (!i.value) {
                    isFormValid = false
                    sendError(i.id, numberErrorMessage);
                }
                break;

            case 'date':
                const yearToCompare = i.value.split('-', [1]);
                if (yearToCompare < yearMin || yearToCompare > yearMax) {
                    isFormValid = false
                    sendError(i.id, birthErrorMessage)
                }
                break;

            case 'checkbox' :
                if (i.id === 'checkbox1' && !i.checked) {
                    isFormValid = false
                    sendError(i.id, termsErrorMessage)
                }
                break;

            case 'radio' :
                if (!i.locationsArray.some((item) => item.checked)){
                    isFormValid = false
                    sendError('location6', optionErrorMessage)
                }
                break;

            default:
                sendError('close', unknownErrorMessage)
                console.error('An error has occurred on a form')
                break;
        }
    }

    return isFormValid;
}

//send a error message in the appropriate p tag that follows the input in error
//gives the className error to give it style
const sendError = (id, text) => {
    const errorToDisplay = document.querySelector(`#${id} ~ p`);
    errorToDisplay.innerText = text;
    errorToDisplay.className = 'data-error'
    const inputToChange = document.getElementById(id);
    inputToChange.className += ' error-bloc'
}


// on validation display message, close btn and hide the form
const sendValidationMessage = () => {
    formData.forEach((e) => e.style.display = 'none');
    submitBtn.style.display = 'none';
    modalCloseBtn.style.display = 'block';
    validationMessage.style.display = 'flex';
}

// on submit click, clean the potential previous error
formContent.addEventListener('submit', (e) => {
    e.preventDefault();

    errorTags.forEach((e) => e.innerText = '')
    formContent.querySelectorAll('input').forEach((e) => e.className = e.className.split(' ')[0])
    const isDataValid = controlData()
    if (!isDataValid) {
        return
    }
    sendValidationMessage()
})


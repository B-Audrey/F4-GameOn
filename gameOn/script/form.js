const formContent = document.getElementById("formContent");
const errorTags = document.querySelectorAll(".formData p")
const emailErrorMessage = "Votre email n'est pas valide"
const stringErrorMessage = "Veuillez entrer minimum 2 caractères  sans chiffres pour votre identité"
const optionErrorMessage = "Vous devez choisir une option"
const termsErrorMessage = "Vous devez accepter les termes et conditions"
const birthErrorMessage = "Vous date de naissance n'est pas valide pour l'inscription"
const unknownErrorMessage = 'Votre forumlaire contient des données inappropriées, merci de bien vouloir recommencer la saisie.'
// dispatch data in appropriate condition to pass control depending on the type

// send error if necessary
const controlData = () => {
    const data = document.querySelectorAll(".formData input[type]");
    errorTags.forEach((e) => e.innerText = "")
    let hasMadeAChoice = false;
    let hasAcceptTerms = true;

    for (let i of data) {
        const type = i.type;
        switch (type) {
            case 'text' :
                const isAvailableString = /^[a-zA-Z]{2,}$/.test(i.value);
                if (!isAvailableString) {
                    sendError(i.id, stringErrorMessage);
                }
                break;
            case 'email' :
                const isAvailableEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/.test(i.value);
                if (!isAvailableEmail) {
                    sendError(i.id, emailErrorMessage);
                }
                break;
            case 'checkbox' :
                if (i.className === "checkbox-input location") {
                    if (i.checked) {
                        hasMadeAChoice = true;
                    }
                }
                if (i.className === "checkbox-input confirmation") {
                    if (!i.checked) {
                        hasAcceptTerms = false;
                    }
                }
                break;
            case 'date':
                const yearMax = new Date().getFullYear() - 18;
                console.log(yearMax);
                const yearMin = new Date().getFullYear() - 100;
                console.log(yearMin);
                const yearToCompare = i.value.split('-', [1]);
                console.log(yearToCompare)
                if (yearToCompare < yearMin || yearToCompare > yearMax) {
                    sendError(i.id, birthErrorMessage)
                }
                break;
            default:
                sendError('close', unknownErrorMessage)
                break;
        }
    }
    if (!hasMadeAChoice) {
        sendError("location6", optionErrorMessage)
    }
    if (!hasMadeAChoice) {
        sendError("checkbox2", termsErrorMessage)
    }
}

//send a error message in the appropriate p tag that follows the input in error
//gives the className error to give it style
const sendError = (id, text) => {
    const errorToDisplay = document.querySelector(`#${id} ~ p`);
    errorToDisplay.innerText = text;
    errorToDisplay.className = "data-error"
    const inputToChange = document.getElementById(id);
    inputToChange.className += " error-bloc"
}


// on submit display message, close btn and hide the form
const sendSubmitMessage = () => {
    formData.forEach((e) => e.style.display = "none");
    submitBtn.style.display = "none";
    modalCloseBtn.style.display = "block";
    validationMessage.style.display = "flex";
}

formContent.addEventListener("submit", (e) => {
    e.preventDefault();
    controlData()
})


function editNav() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
export const submitBtn = document.querySelector('.btn-submit');
export const formData = document.querySelectorAll(".formData");
export const modalCloseBtn = document.querySelector(".btn-close");
export const validationMessage = document.querySelector(".validation-message");
export const formContent = document.getElementById("formContent");
export const errorTags = document.querySelectorAll(".formData p");
const modalBackground = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseX = document.querySelector(".close");
const mainContent = document.querySelector(".hero-section");


// launch modal form
// empty fields and error style messages
// display the white background and hide the back content to keep form only
const launchModal = () => {
    formContent.querySelectorAll("input:not([type='submit']):not([type='button'])").forEach((e) => e.value = null);
    formContent.querySelectorAll('input').forEach((e) => e.className = e.className.split(' ')[0] )
    errorTags.forEach((e) => e.innerText = "")

    modalBackground.style.display = "block";
    mainContent.style.opacity = "0";
    modalCloseBtn.style.display = "none";
    submitBtn.style.display = "block";
    formData.forEach((e) => e.style.display = "block");
}

//close modal event
// reverse the opening function
const closeModal = () => {
    modalBackground.style.display = "none";
    mainContent.style.opacity = "1";
    validationMessage.style.display = "none";
}


// launch modal event, reacting when modal is opening or closing
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseX.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);

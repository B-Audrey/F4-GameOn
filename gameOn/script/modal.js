function editNav() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseX = document.querySelector(".close");
const mainContent = document.querySelector(".hero-section");
const submitBtn = document.querySelector('.btn-submit');
const modalCloseBtn = document.querySelector(".btn-close");
const validationMessage = document.querySelector(".validation-message");


// launch modal form
// display the white background and hide the back content
const launchModal = () => {
    modalbg.style.display = "block";
    mainContent.style.opacity = "0";
    modalCloseBtn.style.display = "none";
    submitBtn.style.display = "block";
    formData.forEach((e) => e.style.display = "block");
}

//close modal event
// reverse the opening function
const closeModal = () => {
    modalbg.style.display = "none";
    mainContent.style.opacity = "1";
    validationMessage.style.display = "none";
}


// launch modal event, reacting when modal is opening or closing
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseX.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);

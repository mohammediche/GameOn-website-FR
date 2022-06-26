function editNav() {
  let x = document.getElementById("myTopnav");
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


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal 
const closeModal = () =>{
  modalbg.style.display = "none";
}
const closeModalEnd = ()=>{
  modalbg.style.display = "none";
  clearForm();
  window.location.reload();
}

/********* Errors messages **********/
const messagesErrors = {
  firstNameError : "Veuillez entrer 2 caractères ou plus pour le champ du prénom",
  lastNameError : "Veuillez entrer 2 caractères ou plus pour le champ du nom",
  emailError : "Veuillez entrer une adresse e-mail valide",
  birthdateError1 : "Vous devez entrer votre date de naissance",
  birthdateError2 : "La date de naissance est invalide",
  concoursError1 : "Ce champ est requis",
  concoursError2 : "Vous devez choisir un nombre entre 0 et 100",
  locationError : "Vous devez choisir une option",
  conditionsError : "Vous devez vérifier que vous acceptez les termes et conditions"
}


const validateInputs = (element, errorMessage)=>{


  element.setAttribute("data-error-visible", "true");
  element.setAttribute("data-error", errorMessage);

}
//////// functions qui return false si le champ est incorrect, ou true si valide ///////////
// champ Prénom
const firstNameValidation = (firstNameInput)=>{

  const firstNameRegex = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/

  if (firstNameRegex.test(firstNameInput.value) === false && first.value.length <= 1) {

    validateInputs(firstNameInput.parentNode, messagesErrors.firstNameError)
  
    return false;
  } 
  else{
    firstNameInput.parentNode.setAttribute("data-error-visible", "false");
    return true;
 }
}
// champ nom
const lastNameValidation = (lastNameInput)=>{
  const lastNameRegex = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/
 if (lastNameRegex.test(lastNameInput.value) === false && lastNameInput.value.length <= 1 ) {

  validateInputs(lastNameInput.parentNode, messagesErrors.lastNameError);
  return false
} 
else{
  lastNameInput.parentNode.setAttribute("data-error-visible", "false");
  return true
}
}
// champ email
const emailValidation = (emailInput)=>{

  const emailRegex = /^[A-Z-a-z-0-9.-_]+[@]{1}[A-Z-a-z-0-9.-_]+[.]{1}[a-z]{2,10}$/;
  if ( emailRegex.test(emailInput.value) === false ) {
    
    validateInputs(emailInput.parentNode, messagesErrors.emailError);
    return false;

  }
  else{
    emailInput.parentNode.setAttribute("data-error-visible", "false");
    return true;
  } 
}
// champ Date de naissance
const birthdayValidation = (birthdayInput)=>{
  let currentDate = new Date(Date.now()).getFullYear();// on récupére la date exacte actuel
  let selectDate = new Date(Date.parse(birthdayInput.value)).getFullYear();// la date séléctionné

  if (!birthdayInput.value ) {

    validateInputs(birthdayInput.parentNode, messagesErrors.birthdateError1)
    return false;
    
  }else if( currentDate - selectDate < 12 || currentDate - selectDate > 99){
    validateInputs(birthdayInput.parentNode, messagesErrors.birthdateError2)
    return false;

  }
  else{
    birthdayInput.parentNode.setAttribute("data-error-visible", "false");
    return true;
  }
}
// champ coucour
const coucourValidation = (concourInput)=>{

  if( concourInput.value === ""){

    validateInputs(concourInput.parentNode, messagesErrors.concoursError1)
    return false;

  }else if( concourInput.value < 0 || concourInput.value > 100){
    
    validateInputs(concourInput.parentNode, messagesErrors.concoursError2)
    return false;
  }
  else{
    concourInput.parentNode.setAttribute("data-error-visible", "false");
    return true;
  }
}
// radio inputs lieux
const locationValidation = (locationInput1,locationInput2, locationInput3, locationInput4, locationInput5, locationInput6)=>{

  if (locationInput1.checked 
  ||locationInput2.checked 
  ||locationInput3.checked 
  ||locationInput4.checked 
  ||locationInput5.checked 
  ||locationInput6.checked) {

   locationInput1.parentNode.setAttribute("data-error-visible", "false");
   return true;
    
  }else{ 

    validateInputs(locationInput1.parentNode, messagesErrors.locationError)
    return false;
  
  }
}
// champ CGU
const conditionsUserValidation = (condtionsUserInput)=>{

   if (condtionsUserInput.checked ) {

    condtionsUserInput.parentNode.setAttribute("data-error-visible", "false");
    return true;
     
   }else{

    validateInputs(condtionsUserInput.parentNode, messagesErrors.conditionsError);
    return false;
   }
   

}

/********** function conditions validate ***********/
const formValid = (e)=>{


  let inputs = this;
  let isValid;


  // prénom
  isValidateFirst = firstNameValidation(inputs["first"]);
  // nom
  isValidateLast = lastNameValidation(inputs["last"]);
  //email
  isValidateEmail = emailValidation(inputs["email"]);
  //birthday
  isValidateBirthday = birthdayValidation(inputs["birthday"]);
  //concours
  isValidateConcours = coucourValidation(inputs["concours"]);
  //options / location
  isValidateLocation = locationValidation(inputs["location1"], inputs["location2"], inputs["location3"], inputs["location4"], inputs["location5"], inputs["location6"]);
  //input checkbox / conditions
  isValidCondtions = conditionsUserValidation(inputs["checkbox1"]);
  
  if (isValidateFirst === false || 
    isValidateLast === false || 
    isValidateEmail === false || 
    isValidateBirthday === false || 
    isValidateConcours === false || 
    isValidateLocation === false || 
    isValidCondtions === false) {
    
    return isValid = false;

  } else {

    console.log("it's working !");
    return isValid = true;
  }

}


const formSubmit = document.querySelector("#form-submit");

formSubmit.onsubmit = function(e){
  e.preventDefault();
  
  if (formValid()) {
    document.querySelector(".modal-body").style.display = "none";
    document.querySelector(".end-modal").style.display = "block"; 
  }
}

// clear toutes les valeurs apres le submit
function clearForm(){

  const cityList = document.querySelectorAll('input[name="location"]');
  let formInputs = document.querySelectorAll('.formData input');
  for (filledInput of formInputs){
    filledInput.value = "";
  }
  for (city of cityList){
    city.checked = false;
  }

}




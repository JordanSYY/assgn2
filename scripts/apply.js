

/* To Validate the Form */


function validate(){
	// Initialises the result variable
	var result = true;

	// Intialises the error tags
	var job_id_error = document.getElementbyId("job_id_error");
	job_id_error.innerHTML = "";
	var firstname_error = document.getElementbyId("firstname_error");
	firstname_error.innerHTML = "";
	var lastname_error = document.getElementbyId("lastname_error");
	lastname_error.innerHTML = "";
	var dob_error = document.getElementbyId("dob_error");
	dob_error.innerHTML = "";
	var gender_error = document.getElementbyId("gender_error");
	gender_error.innerHTML = "";
	var streetaddress_error = document.getElementbyId("streetaddress_error");
	streetaddress_error.innerHTML = "";
	var suburb_error = document.getElementbyId("suburb_error");
	suburb_error.innerHTML = "";
	var state_error = document.getElementbyId("state_error");
	state_error.innerHTML = "";
	var postcode_error = document.getElementbyId("postcode_error");
	postcode_error.innerHTML = "";
	var email_error = document.getElementbyId("email_error");
	email_error.innerHTML = "";
	var phonenumber_error = document.getElementbyId("phonenumber_error");
	phonenumber_error.innerHTML = "";
	var skill_error = document.getElementbyId("skill_error");
	skill_error.innerHTML = ""


	// If there is an error in the input it will set the result to false and displays an error message
	// To get the variables from the form and will chgeck the given rules

	var jobid = document.getElementbyId("jobid").value;
    if (jobid == ""){
	   job_id_error.innerHTML = "Job Reference Number must not be blank";
	   result = false;
	}

	var firstname = document.getElementbyId("firstname").value;
	if (!firstname.match(/^[a-zA-Z]+$/) || firstname.value == ""){
		firstname_error.innerHTML = "First name must only contain alphabetic characters";
        alert("First name must only contain alphabetic characters")
		result = false;
	}

	var lastname = document.getElementbyId("lastname").value;
	if (!lastname.match(/^[a-zA-Z\-]+$/) || lastname.value == ""){
		lastname_error.innerHTML = "Last name must only contain aphabetic characters";
		result = false;
	}

	var dateofbirth = document.getElementbyId("dateofbirth").value;
	if (!dateofbirth.match(/\d{2}\/\d{2}\/\d{4}/)){
		dob_error.innerHTML = "Invalid Date of Birth";
		result = false;
	}

    var age = calculate_age(dateofbirth);
    if (!isFinite(age) || isNaN(age)) {
        dob_error.innerHTML = "Your Date of Birth role is not Available.";
        result = false;
    }
    else if (age < 21 || age > 70) {
        dob_error.innerHTML =
            "You must be between 21 and 70 years old to apply.";
        result = false;
    }

	var male = document.getElementbyId("male").checked;
    var female = document.getElementbyId("female").checked;
    var other = document.getElementbyId("other").checked;
    var rathernotsay = document.getElementbyId("rathernotsay").checked;
    if (!(male || female || other || rathernotsay)) {
        gender_error.innerHTML = "Please select a gender.";
        result = false;
    }

    var streetaddress = document.getElementbyId("streetaddress").value;
    if (streetaddress == "") {
        streetaddress_error.innerHTML = "You must enter a street address.";
        result = false;
    }

    var suburb = document.getElementbyId("suburb").value;
    if (suburb == "") {
        suburb_error.innerHTML = "You must enter a suburb or town";
        result = false;
    }

    var postcode = Number(document.getElementbyId("postcode").value);
    if (postcode == "") {
        postcode_error.innerHTML = "You must select a postcode";
        result = false;
    }

    var state = document.getElementbyId("state").value
    if (state == "") {
        state_error.innerHTML = "You must select a state";
        result = false;
    } else {
        var tempMsg = validate_postcode(state, postcode);
        if (tempMsg != "") {
            state_error.innerHTML = tempMsg;
            result = false;
        }
    }

    var email = document.getElementbyId("email").value;
    if (email == "") {
        email_error.innerHTML = "You must enter an email address";
        result = false;
    }

    var phonenumber = document.getElementbyId("phonenumber").value;
    if (phonenumber == "") {
        phonenumber_error.innerHTML = "You must enter a phone number";
        result = false;
    }

    if (result){
        storeBooking(firstname, lastname, dateofbirth, male, female, other, rathernotsay, streetaddress, suburb, state, postcode, email, phonnumber)
    }

	if (!result) {
        document.getElementbyId("error_check").innerHTML = "Please correct all of the errors given above.";
    }

	return result;
    event.preventDefault();
}

/**
 * calcualte age from date of birth
 */
function calculate_age(dateofbirth) {
    var today = new Date();
    var DateOfBirth = new Date(dateofbirth);
    // get the difference between the years
    var age = today.getFullYear() - DateOfBirth.getFullYear();
    // get the difference between the months
    var month = today.getMonth() - DateOfBirth.getMonth();
    // if the dateofbirth month and day is earlier in the year
    if (month < 0 || (month === 0 && today.getDate() < DateOfBirth.getDate())) {
        age--; // remove a year
    }
    return age;
}

function validate_postcode(state, postcode) {
    var errMsg = "";
    switch (state) {
        case "vic":
            if (!((postcode >= 3000 && postcode <= 3999) || (postcode >= 8000 && postcode <= 8999))) {
                errMsg += "Post Code not in Victoria.";
            }
            break;
        case "nsw":
            if (!((postcode >= 1000 && postcode <= 2599) || (postcode >= 2619 && postcode <= 2899) || (postcode >= 2921 && postcode <= 2999))) {
                errMsg += "Post Code not in New South Wales.";
            }
            break;
        case "qld":
            if (!((postcode >= 4000 && postcode <= 4999) || (postcode >= 9000 && postcode <= 9999))) {
                errMsg += "Post Code not in Queensland.";
            }
            break;
        case "nt":
            if (!(postcode >= 800 && postcode <= 999)) {
                errMsg += "Post Code not in Northern Territory.";
            }
            break;
        case "wa":
            if (!(postcode >= 6000 && postcode <= 6999)) {
                errMsg += "Post Code not in Western Australia.";
            }
            break;
        case "sa":
            if (!(postcode >= 5000 && postcode <= 5999)) {
                errMsg += "Post Code not in Southern Australia.";
            }
            break;
        case "tas":
            if (!(postcode >= 7000 && postcode <= 7999)) {
                errMsg += "Post Code not in Tasmania.";
            }
            break;
        case "act":
            if (!((postcode >= 200 && postcode <= 299) || (postcode >= 2600 && postcode <= 2618) || (postcode >= 2900 && postcode <= 2920))) {
                errMsg += "Post Code not in Australian Capital Territory.";
            }
            break;
        default:
            errMsg = "Post Code not Valid.";
    }
    return errMsg;
}

/* Prefill the form from exisitng session data */
function prefill_id() {
    var jobId_input = document.getElementbyId("jobid");
    if (localStorage.jobId != undefined) {
        // hidden input to submit details
        jobId_input.value = localStorage.jobId;
        jobId_input.readOnly = true;
    } else {
        jobId_input.readOnly = false;
    }
}

/* Prefill the form from exisitng session data */
function prefill_form() {
    prefill_id();
    if (sessionStorage.firstname != undefined) {
        document.getElementbyId("firstname").value = sessionStorage.firstname;
        document.getElementbyId("lastname").value = sessionStorage.lastname;
        document.getElementbyId("dateofbirth").value = sessionStorage.dateofbirth;
        document.getElementbyId("streetaddress").value = sessionStorage.streetaddress;
        document.getElementbyId("suburb").value = sessionStorage.suburb;
        document.getElementbyId("state").value = sessionStorage.state;
        document.getElementbyId("postcode").value = sessionStorage.postcode;
        document.getElementbyId("email").value = sessionStorage.email;
        document.getElementbyId("phonenumber").value = sessionStorage.phonenumber;

        switch (sessionStorage.gender) {
            case "male":
                document.getElementbyId("male").checked = true;
                break;
            case "female":
                document.getElementbyId("female").checked = true;
                break;
            case "other":
                document.getElementbyId("other").checked = true;
                break;
            case "rathernotsay":
                document.getElementbyId("rathernotsay").checked = true;
                break;
        }
        var skills = sessionStorage.skills;
        document.getElementbyId("skill1").checked = skills.includes("skill1");
        document.getElementbyId("skill2").checked = skills.includes("skill2");
        document.getElementbyId("skill3").checked = skills.includes("skill3");
    }
}

/* Store Job ID for pre fill in application form */
function storeJobId1() {
    localStorage.jobId = document.getElementbyId("job1_id").innerHTML;
}
function storeJobId2() {
    localStorage.jobId = document.getElementbyId("job2_id").innerHTML;
}

/**
 * Store values for session
 */
function storeBooking(skill1, skill2, skill3, comm, firstname,
    lastname, dateofbirth, streetaddress, suburb, state, postcode, email, phonenumber, male, female, other, rathernotsay) {
    // store values in sessionStorage
    var skill_string = "";
    if (skill1) {
        skill_string = "skill1";
    }
    if (skill2) {
        if (skill_string != "") {
            skill_string += ", ";
        }
        skill_string += "skill2";
    }
    if (skill3) {
        if (skill_string != "") {
            skill_string += ", ";
        }
        skill_string += "skill3";
    }
    sessionStorage.skills = skill_string;

    sessionStorage.firstname = firstname;
    sessionStorage.lastname = lastname;
    sessionStorage.dateofbirth = dateofbirth;
    sessionStorage.streetaddress = streetaddress;
    sessionStorage.suburb = suburb;
    sessionStorage.state = state;
    sessionStorage.postcode = postcode;
    sessionStorage.email = email;
    sessionStorage.phonenumber = phonenumber;
    sessionStorage.comm = comm;
    if (male) {
        sessionStorage.gender = "male";
    } else if (female) {
        sessionStorage.gender = "female";
    } else if (other) {
        sessionStorage.gender = "other";
    } else if (rathernotsay) {
        sessionStorage.gender = "rathernotsay";
    }

}

/*
 This function is called when the browser window loads
 it will register functions that will respond to browser events
*/
function init() {
    if (document.title == "Available Jobs") {
        document.getElementbyId("job1_apply").onclick = storeJobId1;
        document.getElementbyId("job2_apply").onclick = storeJobId2;
    } else if (document.title == "Application Form") {
        prefill_form();
        // register the event listener to the form
        document.getElementbyId("apply_form").onsubmit = validate();
        document.getElementbyId("apply_form").onreset = function () {
            localStorage.clear();
            prefill_id();
        ;}
    }
}

window.onload = init();


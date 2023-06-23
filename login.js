// declare an object for storing user information
var User = {};

// Utilizing user input and verification, create User object attributes
function newUser(obj){
    // do-while loop so that the first iteration is processed upon initiation,
    // but loops if the user doesn't confirm their information
    do {
        //set user input to temporary varaibles
        //currently their are no requirements for characters, length, complexity 
        //so the user could simply click ok and blanks will be accepted
        let _name = prompt("Enter User Name: ");
        let pswd = prompt("Enter Password: ");
        //set boolean variable for conditional comparison
        notConfirmed = true;
        if (confirm("Would you like to save this user name and password?") == true){
            // after confirmation, set user input to User object and change boolean 
            notConfirmed = false;
            obj.userName = _name;
            obj.userPswd = pswd;
            alert("New User created: " + obj.userName);
        }

        else{
            // inform user the information was not used to create an user object
            alert("User not added");
        }
    //check condition and loop if necessary
    } while (notConfirmed == true);
}

// A simple function to display the user's password
// Mostly used for debugging the password changer, in the instances I forgot what password was originally entered
function viewPassword(){
    confirm("New Password: " + User.userPswd);
}
// function to allow the user to change their password
function changePassword(){
    // Ask the user to verify they would like to change their password, 
    if (confirm("Would you like to change the current password for: " + User.userName + "?") == true){
        // Verify the correct user by asking for their current password
        pswdVerification = prompt("Please enter current password");
        if (pswdVerification == User.userPswd){
            // get user input for their new password and assign it to a temporary variable
            let newPswd = prompt("Enter new password for " + User.userName);
            // Confirm the user wishes to change to the new password they entered
            // update the user's password
            if (confirm("Are you sure you want to save this new password?") == true){
                User.userPswd = newPswd;
                viewPassword();
            }
            // Inform the user their password was not changed if they chose not to change it
            else{
                alert("Password was not changed");
            }
        }
    }
}

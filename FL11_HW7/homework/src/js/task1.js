const emailReqLength = 6;
const passwordReqLength = 5;
const credentials = {
  user: {
    email: 'user@gmail.com',
    password: 'UserPass'
  },
  admin: {
    email: 'admin@gmail.com',
    password: 'AdminPass'
  }
};
let password;
let newPassword;
let isOldPassword;
let isNewPassword;
let passwordChange = false;
let email = prompt('Please enter your email');
if (email === null || email.length === 0) {
  alert('Chancelled');
} else {
  if (email.length < emailReqLength) {
    alert(`I don't know any emails having name length less than ${emailReqLength} symbols`);
  } else if (email === credentials.user.email || email === credentials.admin.email) {
    password = prompt('Enter your password');
    if (password === null || password.length === 0) {
      alert('Chancelled');
    } else if (
      email === credentials.user.email && password === credentials.user.password ||
      email === credentials.admin.email && password === credentials.admin.password
    ) {
      passwordChange = confirm('Do you want to change your password?');
      if (passwordChange) {
        isOldPassword = prompt('Please enter the old password');
        if (isOldPassword === null || isOldPassword.length === 0) {
          alert('Chancelled');
        } else if (isOldPassword === credentials.user.password || isOldPassword === credentials.admin.password) {
          newPassword = prompt('Please enter your new password');
          if (newPassword.length < passwordReqLength) {
            alert("It's too short password. Sorry");
          } else {
            isNewPassword = prompt('Please enter again your new password');
            if (newPassword !== isNewPassword) {
              alert('You wrote the wrong password');
            } else {
              alert('You have successfully changed your password');
            }
          }
        } else {
          alert('Wrong password');
        }
      } else {
        alert('You have failed the change');
      }
    } else {
      alert('Wrong password');
    }
  } else {
    alert("I don't know you");
  }
}

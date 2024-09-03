//Chetan Patil - [20-07-23] - added validation variables to add validation in fields

//email validation method
export const isEmailValid = (email: string) => {
  //returns true if the email matches the regex for a valid email else returns false
  return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
    email
  );
};

//password validation method
export const isPasswordValid = (password: string) => {
  //return true if the length of the password is more than or equal to 8 characters else returns false
  return password.length >= 6;
};

//assessment name validation
export const isAssessmentNameValid = (assessmentName: string) => {
  //return true if the length of the assessmentLanguage is more than or equal to 1 characters else returns false
  return assessmentName?.length >= 1;
};

//Text field validation
export const isTextValid = (text: string) => {
  //return true if the length of the text is more than or equal to 1 else returns false
  return text?.length >= 1;
};
export const isNumberValid = (num: any) => {
  return /\d/.test(num);
};

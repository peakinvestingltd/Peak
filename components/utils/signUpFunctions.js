exports.validationPage1 = (name, surname, dob, next, err) => {
  const minAge = Date.now() - 568080000000;
  if (name && surname && dob) {
    if (dob < minAge) {
      return next();
    } else {
      const bool = true;
      console.log("true");

      return err(bool);
    }
  } else {
    console.log("false");
    const bool = false;
    return err(bool);
  }
};

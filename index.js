const btnDays = document.getElementById('btnDays');
const btnMonths = document.getElementById('btnMonths');
const btnYears = document.getElementById('btnYears');
const dobSelector = document.getElementById('dob');
const birthInfoDiv = document.getElementById('days');

btnDays.addEventListener('click', () => {
    if(isValidDate()){
      const dateInfoObtained = getBirthDateInfo();
      const dayDifference = dateDiffInDays(dateInfoObtained.birthDateInfo, dateInfoObtained.todayDateInfo);
      birthInfoDiv.style.opacity = 1;
      if (dayDifference >= 0) birthInfoDiv.innerHTML = `You are now ${dayDifference} days old.`;
      if(dayDifference === 1  ) birthInfoDiv.innerHTML = `You are now ${dayDifference} day old.`;
  }
})

btnMonths.addEventListener('click', () => {
    if(isValidDate()){
        const dateInfoObtained = getBirthDateInfo();
        const monthDifference = dateDiffInMonths(dateInfoObtained.birthDateInfo, dateInfoObtained.todayDateInfo);
        birthInfoDiv.style.opacity = 1;
        birthInfoDiv.innerHTML = `You are now ${monthDifference} months old.`;
    } 
})

btnYears.addEventListener('click', () => {
    if(isValidDate()){
        const dateInfoObtained = getBirthDateInfo();
        const yearDifference = dateDiffInYears(dateInfoObtained.birthDateInfo, dateInfoObtained.todayDateInfo);
        birthInfoDiv.style.opacity = 1;
        birthInfoDiv.innerHTML = `You are now ${yearDifference} years old.`;
    } 
})


const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _MS_PER_YEAR = _MS_PER_DAY * 365;

function dateDiffInMillisecs(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return utc2 - utc1;
}

function dateDiffInDays(a, b) {
  return Math.floor(dateDiffInMillisecs(a,b) / _MS_PER_DAY);
}

function dateDiffInYears(a, b) {
  return Math.floor(dateDiffInMillisecs(a,b) / _MS_PER_YEAR);
} 

function dateDiffInMonths(a, b) {
  return dateDiffInYears(a, b) * 12;
}

function getBirthDateInfo() {
  const todayDate = new Date();
  const birthDateValue = document.getElementById('dob').value; //Value is read as a string;
  const splitDate = birthDateValue.split('-');
  const birthDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
  const dateInfoObj = {
    todayDateInfo: todayDate,
    birthDateInfo: birthDate
  }
  return dateInfoObj;
}

function isValidDate() {
  const todayDate = new Date();
  const birthDateValue = document.getElementById('dob').value; //Value is read as a string;
  if(!birthDateValue) {
    birthInfoDiv.style.opacity = 1;
    birthInfoDiv.innerHTML = `Please select a date.`;
    return false;
  } 
  if (birthDateValue) {
    const splitDate = birthDateValue.split('-');
    const birthDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
    const dayDifference = dateDiffInDays(birthDate,todayDate );
    console.log("birthDateValue: ", birthDateValue);
    console.log('Day difference: ', dayDifference)
    if(dayDifference < 0){
      birthInfoDiv.style.opacity = 1;
      birthInfoDiv.innerHTML = `The date must be less than or equal to today's date.`;
      return false;
    } else return true;
  }
  
}

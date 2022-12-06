const userEnteredDate = document.querySelector("#date-inp");
const showBtn = document.getElementById("show");
const message = document.querySelector("#message");

const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

function reverseString(str) {
    let listOfChars = str.split('');
    let reversedListOfChar = listOfChars.reverse();
    let reversedString = reversedListOfChar.join('');
    return reversedString;
  }
  
  function isStringPalindrome(str) {
    let reversedString = reverseString(str);
    return str === reversedString;
  }
  
  function getDateAsString(date) {
    let dateInStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateInStr.day = '0' + date.day;
    }
    else {
      dateInStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateInStr.month = '0' + date.month;
    }
    else {
      dateInStr.month = date.month.toString();
    }
  
    dateInStr.year = date.year.toString();
    return dateInStr;
  }
  
  function getDateInAllFormats(date) {
    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }
  
  function checkPalindromeForAllDateFormats(date) {
    let dateFormatList = getDateInAllFormats(date);
    let palindromeList = [];
  
    for (let i = 0; i < dateFormatList.length; i++) {
      let result = isStringPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
  }
  
  function isLeapYear(year) {
  
    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }
  
  function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
function getPreviousDate(date){
    let day = date.day-1;
    let month = date.month;
    let year = date.year;

    if(month === 3 && day === 1){
        if(isLeapYear(year)){
                day = 29;
        }else{
                day = 28;
        }
        month -= 1;   
    }else{
        if(day === 0){
            month -= 1;
            if(month!==0){
                day = daysInMonth[month-1];
            }
        }
        
    }

    if(month === 0){
        month = 12;
        day = daysInMonth[month-1]
        --year;
    }

    return {
        day:day,month:month,year:year
        
    }
}

function getPreviousPalindromeDate(date){
    let previousDate = getPreviousDate(date);
    let counter = 0;

    while(1){
        ++counter;
        let dateStr = getDateAsString(previousDate);
        let resultList = checkPalindromeForAllDateFormats(dateStr);
    
        for (let i = 0; i < resultList.length; i++) {
          if (resultList[i]) {
              console.log({counter},{previousDate});
            return {counter:counter, previousDate:previousDate};
          }
        }

        previousDate = getPreviousDate(previousDate);
    }
}

function getNextPalindromeDate(date) {
  
    let nextDate = getNextDate(date);
    let ctr = 0;
  
    while (1) {
      ctr++;
      let dateStr = getDateAsString(nextDate);
      let resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
            console.log({ctr},{nextDate});
          return {ctr:ctr, nextDate:nextDate};
        }
      }
      nextDate = getNextDate(nextDate);
    }
}

function dateObjectTODateString(obj){
    let day = obj.day;
    let month = obj.month;
    let year = obj.year;

    let dateAsStr = getDateAsString({day:day,month:month,year:year});
    
    return dateAsStr.day+'-'+dateAsStr.month+'-'+dateAsStr.year;
}

function getPalindromeDates(date){
    let nextPalindromeObj = getNextPalindromeDate(date);
    let prevPalindromeObj = getPreviousPalindromeDate(date);
    let nextPalindromeCounter = Number(nextPalindromeObj.ctr);
    let nextPalindromeDate = dateObjectTODateString(nextPalindromeObj.nextDate);
    let prevPalindromeCounter = Number(prevPalindromeObj.counter);
    let prevPalindromeDate = dateObjectTODateString(prevPalindromeObj.previousDate);

    console.log({nextPalindromeCounter},{nextPalindromeDate})
    console.log({prevPalindromeCounter},{prevPalindromeDate});

    if(nextPalindromeCounter <= prevPalindromeCounter){
        sendMessage(`Your ${nextPalindromeCounter} days behind, next Palindrome Birthday is on ${nextPalindromeDate}`);
        // return [nextPalindromeCounter,nextPalindromeDate];
    }else{
       sendMessage(`Your ${prevPalindromeCounter} days ahead, previous Palindrome Birthday was on ${prevPalindromeDate}`);
       return [prevPalindromeCounter,prevPalindromeDate];
    }

}

function sendMessage(msg){
    message.innerText  = msg;
}

function checkDate(date){
    sendMessage("");
    if(!date){
        sendMessage("Date cannot be empty");
        return false;
    }
    return true;
}

function showPalindromeDate(){
    sendMessage("");
    
    let UEdate = userEnteredDate.value;
    
    if(!checkDate(UEdate)){
        return;
    }

    let splitDate = UEdate.split("-");
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];
    let date = {day:Number(day),month:Number(month),year:Number(year)};

    let dateStr = getDateAsString(date);
    let palindromeList = checkPalindromeForAllDateFormats(dateStr);

    let res = palindromeList.forEach( palindrome => {
        if(palindrome){
            sendMessage("Hurray your birthday is Palindrome Birthday!!.")
            return true;
        }else{
            return false;
        }
    });

    if(!res){
        getPalindromeDates(date);
    }

}

showBtn.addEventListener("click",showPalindromeDate);
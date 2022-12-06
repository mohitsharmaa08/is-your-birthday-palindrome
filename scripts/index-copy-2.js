
const daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

function isPalindrome(astring){
    let l = astring.length;
    let m = parseInt(l/2);
    let xi = 0;
    let yi = l-1;
    for(;xi!==m;++xi,--yi){
        if(astring.charAt(xi) !== astring.charAt(yi)){
            return false;
        }
    }
    return true;
}

function dateToString(numberDate){
    let stringDate ={
        day:"",month:"",year:""
    };

    if(numberDate.day < 10){
        stringDate.day = "0"+numberDate.day;
    }else{
        stringDate.day = ""+numberDate.day;
    }

    if(numberDate.month < 10){
        stringDate.month = "0"+numberDate.month;
    }else{
        stringDate.month = ""+numberDate.month;
    }

    stringDate.year = ""+numberDate.year;

    return stringDate;
}

function getAllDateFormats(date){

    let stringDate = dateToString(date);

    let xdcc = [];
    let DD = stringDate.day;
    let MM = stringDate.month;
    let YYYY = stringDate.year;
    let YY = stringDate.year.slice(2,4);

    xdcc.push(DD+MM+YYYY);
    xdcc.push(MM+DD+YYYY);
    xdcc.push(YYYY+MM+DD);
    xdcc.push(DD+MM+YY);
    xdcc.push(MM+DD+YY);
    xdcc.push(YY+MM+DD);
    return xdcc;
}

function checkPalindromeForAllDateFormats(date){
    
    let allDateFormats = getAllDateFormats(date);
    let palindromeList = [];

    for(let date of allDateFormats){
        if(isPalindrome(date)){
            palindromeList.push(true);
        }else{
            palindromeList.push(false);
        }
    }

    return palindromeList;
}

function isLeapYear(year){

    let divideBy4 = year % 4;
    let divideBy100 = year % 100;
    let divideBy400 = year % 400;

    console.log()

    let condition1 =  ((divideBy4 === 0) && (divideBy100 !== 0));
    let condition2 =  divideBy400 === 0;

    if(condition1 || condition2){
        return true;
    }

    return false;
}

function getNextDate(date){
    let day = date.day+1;
    let month = date.month;
    let year = date.year;
    // let daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month += 1;
            }       
        }else{
            if(day > 28){
                day = 1;
                month +=1;
            }
        }   
    }else{
        if(day > daysInMonths[month-1]){
            day = 1;
            month += 1;
        }
    }

    if(month > 12){
        month = 1;
        ++year;
    }

    return {
        day:day,month:month,year:year
    }        
}

function getNextPalindromeDate(date){
    let nextDate = getNextDate(date);
    let counter = 0;

    while(1){
        ++counter;
        let resultList = checkPalindromeForAllDateFormats(date);
        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
              return [counter, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

let date = {
    day: 5,
    month: 1,
    year: 2020
}

console.log(checkPalindromeForAllDateFormats(date));
console.log(getNextPalindromeDate(date));
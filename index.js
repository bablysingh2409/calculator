let buttons = document.querySelectorAll('.individual-num');
const calc_content = document.querySelector('.calc-content');
// let count = 0;
let fstWord;
let secondWord;
let operator;
let isfstWordComplete = false;
let isAns = false;
let isOnlyOneDotInFst = false;
let isOnlyOneDotInScnd = false;
let isOperator = false;

function percentage(num) {
  return num / 100;
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b == 0) {
    return false;
  }
  return a / b;
}

function callEachFunc(fisrt, second, operator) {
  let funAns;

  switch (operator) {
    case '+':
      funAns = add(fisrt, second);
      break;
    case '-':
      funAns = subtract(fisrt, second);
      break;
    case '*':
      funAns = multiply(fisrt, second);
      break;
    case '/':
      funAns = divide(fisrt, second);
      break;
  }
  return funAns;
}

//reset calculator
function resetCalculator() {
  fstWord = undefined;
  secondWord = undefined;
  operator = undefined;
  isfstWordComplete = false;
  isAns = false;
  isOnlyOneDotInFst = false;
  isOnlyOneDotInScnd = false;
  isOperator = false;
  return;
}
buttons.forEach((ele) => {
  ele.addEventListener('click', function (e) {
    //checking the condition
    let logic =
      ele.textContent === '+' ||
      ele.textContent === '-' ||
      ele.textContent === '*' ||
      ele.textContent === '/' ||
      ele.textContent === '%' ||
      ele.textContent === '=' ||
      ele.textContent === '%' ||
      ele.textContent === '+/-';

    //clear the calculator
    if (ele.textContent == 'AC') {
      calc_content.textContent = '';
      resetCalculator();
      return;
    }

    //calculate the percentage and set that value to fstWord variable
    if (ele.textContent == '%' && fstWord) {
      let percentageResult = percentage(Number(calc_content.textContent));
      calc_content.textContent = percentageResult;
      console.log(typeof percentageResult);
      fstWord = percentageResult;
      console.log(fstWord);
      return;
    }

    //before typing any num if user type any operator
    if (!fstWord && logic) {
      alert('invalid number');
      return;
    }

    // user type another fst no. instead of using the ans
    else if (isAns && !logic && !isOperator) {
      console.log(fstWord);
      resetCalculator();
      fstWord = Number(ele.textContent);
      calc_content.textContent = fstWord;
      isAns = false;
      console.log('in fst');
    }

    //assigning the fst number
    else if (!fstWord && !isAns) {
      fstWord = Number(ele.textContent);
      console.log(fstWord);
      calc_content.textContent = ele.textContent;
    }

    // if user type any operator after fst number
    else if (!isfstWordComplete && logic) {
      if (ele.textContent === '=') {
        alert('type a valid operator');
        return;
      }
      console.log(fstWord);
      calc_content.textContent = '';
      operator = ele.textContent;
      calc_content.textContent = operator;
      isfstWordComplete = true;
      isOperator = true;
    }

    // if fst word is not completed
    else if (fstWord && !isfstWordComplete && !isAns && !logic) {
      if (ele.textContent === '.' && !isOnlyOneDotInFst) {
        fstWord = fstWord + ele.textContent;
        calc_content.textContent = fstWord;
        isOnlyOneDotInFst = true;
        // console.log('fst-scnd-char');
      } else if (ele.textContent !== '.') {
        calc_content.textContent = fstWord + ele.textContent;
        if (calc_content.textContent.length > 10) {
          alert('more than 10 words are not accepted');
          return;
        }
        fstWord = Number(fstWord + ele.textContent);
      } else if (isOnlyOneDotInFst) {
        alert('dont use two dots in a single word');
        return;
      }
    }

    //now assining the second number
    else if (!secondWord && !logic) {
      if (ele.textContent == '=') {
        alert('type a valid operator in second');
        return;
      }
      calc_content.textContent = '';
      secondWord = Number(ele.textContent);
      calc_content.textContent = secondWord;
    }

    //if second num won't be completed
    else if (secondWord && !logic) {
      if (ele.textContent == '.' && !isOnlyOneDotInScnd) {
        secondWord = secondWord + ele.textContent;
        calc_content.textContent = secondWord;
        isOnlyOneDotInScnd = true;
      } else if (ele.textContent !== '.') {
        calc_content.textContent = secondWord + ele.textContent;
        if (calc_content.textContent.length > 10) {
          alert('more than 10 words are not accepted');
          return;
        }
        secondWord = Number(secondWord + ele.textContent);
      } else if (isOnlyOneDotInScnd) {
        alert('dont use two dots in a single word');
        return;
      }
    }

    // calculating the answer after = to assignment
    else if (ele.textContent === '=' && fstWord && secondWord) {
      calc_content.textContent = '';
      let ans = callEachFunc(fstWord, secondWord, operator);
      if (ans % 1 !== 0) {
        ans = ans.toFixed(10);
      }
      calc_content.textContent = ans;
      fstWord = ans;
      secondWord = 0;
      isfstWordComplete = false;
      isAns = true;
      isOperator = false;
    }
  });
});

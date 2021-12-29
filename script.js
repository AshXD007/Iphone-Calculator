//elements
//timing


const hourEl = document.querySelector('.hour');
const minutesEl = document.querySelector('.minutes');
const displayEl = document.querySelector('.display');

//funct


const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

//operators


const divideEl = document.querySelector('.divide');
const multiplyEl = document.querySelector('.multiply');
const subtractEl = document.querySelector('.subtract');
const addEl = document.querySelector('.add');
const equalEl = document.querySelector('.equal');
const decimalEl = document.querySelector('.decimal');


//numbers


const nineEl = document.querySelector('.nine');
const eightEl = document.querySelector('.eight');
const sevenEl = document.querySelector('.seven');
const sixEl = document.querySelector('.six');
const fiveEl = document.querySelector('.five');
const fourEl = document.querySelector('.four');
const threeEl = document.querySelector('.three');
const twoEl = document.querySelector('.two');
const oneEl = document.querySelector('.one');
const zeroEl = document.querySelector('.zero');
const numberElArray = [zeroEl,oneEl,twoEl,threeEl,fourEl,fiveEl,sixEl,sevenEl,eightEl,nineEl];

//variables
let valueStrInMemory = null;
let operatorInMemory = null;


//functions
const getValueAsStr = () => {
    const currentDisplayStr = displayEl.textContent;
    return currentDisplayStr.split(',').join('');
}
const getValueAsNum = () =>{
    return parseFloat(getValueAsStr());
} 

const setStrAsValue = (valueStr) => {
    if(valueStr[valueStr.length - 1] === '.'){
        displayEl.textContent += '.';
        return
    }

    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if(decimalStr){
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    }
    else{
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
    }

}

const handleNumberClick =(numStr) =>{
  const currentDisplayStr = getValueAsStr();
  if(currentDisplayStr === '0') {
      setStrAsValue(numStr);
  }else{
      setStrAsValue(currentDisplayStr + numStr);
    }
    
}
const getResultofOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if(operatorInMemory === 'add'){
        newValueNum = valueNumInMemory + currentValueNum;

    }else if(operatorInMemory === 'subtract'){
        newValueNum = valueNumInMemory - currentValueNum;
    }else if(operatorInMemory === 'multiply'){
        newValueNum = valueNumInMemory * currentValueNum;
    }else if(operatorInMemory === 'divide'){
        newValueNum = valueNumInMemory / currentValueNum;
    }
    return newValueNum.toString();
}


const handleOperatorClick = (operation) => {
    const currentDisplayStr = getValueAsStr();
    
    if(!valueStrInMemory){
        valueStrInMemory = currentDisplayStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }

    let newValueStr = getResultofOperationAsStr();
    valueStrInMemory = newValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
}

//event listners to functions
acEl.addEventListener('click' , () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});
pmEl.addEventListener ('click',()=>{
    const currentValueNum = getValueAsNum();
    const currentDisplayStr = getValueAsStr();
    if(currentDisplayStr === '-0'){
        setStrAsValue('0');
        return;
    }
    if(currentValueNum>=0){
        setStrAsValue('-' + currentDisplayStr);
    }else{
        setStrAsValue(currentDisplayStr.substring(1));
    }
})
percentEl.addEventListener('click',()=>{
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
    
})

//event listners to operators
addEl.addEventListener('click',()=>{
    handleOperatorClick('add')
})
subtractEl.addEventListener('click',()=>{
    handleOperatorClick('subtract')
})
multiplyEl.addEventListener('click',()=>{
    handleOperatorClick('multiply')
})
divideEl.addEventListener('click',()=>{
    handleOperatorClick('divide')
})
equalEl.addEventListener('click', () => {
    if(valueStrInMemory){
        setStrAsValue(getResultofOperationAsStr());
        operatorInMemory = null;
        valueStrInMemory = null;
    }
})


//Event Listeners to numbers
for(let i=0; i < numberElArray.length; i++)
{
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click',() => {
      handleNumberClick(i.toString());

    });
}
decimalEl.addEventListener('click',() => {
    const currentDisplayStr = getValueAsStr();
    if(!currentDisplayStr.includes('.')){
        setStrAsValue(currentDisplayStr + '.');
    }
})


// time

const updateTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    hourEl.textContent = currentHour.toString();
    minutesEl.textContent = currentMinutes.toString().padStart(2 , '0');
}
setInterval(updateTime,1000);
updateTime();
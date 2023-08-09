let lastOperand = 0;
let operation = null;
let result = null;

const inputWindow = document.querySelector('#inputWindow');
const number = document.querySelectorAll('.btn_num');
const symbol = document.querySelectorAll('.btn_sym');

//обработчик событий, связанных с щелчком на кнопку для ввода цифр
number.forEach(function(num){
    num.addEventListener('click', function(){
        inputWindow.value += num.textContent;
    })
})

//обработчик событий, связанных с щелчком на кнопку для ввода оператора
symbol.forEach(function(sym){
    sym.addEventListener('click', function(){
        operation = sym.textContent;
        lastOperand = inputWindow.value;
        inputWindow.value = '';
    })
})

//обработчик кнопки очистки
document.querySelector('#btn_clr').addEventListener('click', function () {
    lastOperand = 0;
    operation = null;
    inputWindow.value = '';
})

//обработчик кнопки "="" итог вычисления
document.getElementById('btn_calc').addEventListener('click', function () {
    result = eval(lastOperand+operation+inputWindow.value);
    operation = null;
    lastOperand = 0;
    inputWindow.value = result;
})
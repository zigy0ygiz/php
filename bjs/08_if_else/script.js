let minValue = null;
let maxValue = null;
const minV = -999;
const maxV = 999;
let answerNumber  = null;
let answerNumberText = null;
let orderNumber = 1;
let gameRun = true;
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

//Функция формирования текстового представления числа
function numToText(n){
    const number = {
        "0": "0",
        "1": "один",
        "2": "два",
        "3": "три",
        "4": "четыре",
        "5": "пять",
        "6": "шесть",
        "7": "семь",
        "8": "восемь",
        "9": "девять",
        "10": "десять",
        "11": "одиннадцать",
        "12": "двенадцать",
        "13": "тринадцать",
        "14": "четырнадцать",
        "15": "пятнадцать",
        "16": "шестнадцать",
        "17": "семнадцать",
        "18": "восемнадцать",
        "19": "девятнадцать",
        "20": "двадцать",
        "30": "тридцать",
        "40": "сорок",
        "50": "пятьдесят",
        "60": "шестьдесят",
        "70": "семьдесят",
        "80": "восемьдесят",
        "90": "девяносто",
        "100": "сто",
        "200": "двести",
        "300": "триста",
        "400": "четыреста",
        "500": "пятьсот",
        "600": "шестьсот",
        "700": "семьсот",
        "800": "восемьсот",
        "900": "девятьсот",
    };

    let nstr = n.toString();
    let text = '';

    if (n<0){
        text+='минус ';
        n = Math.abs(n);
        nstr = n.toString()
        console.log(n);
    }
    
    if(n >= 0 && n <= 19){
            text += number[n];
        }
        else if(n >= 20 && n <= 99){
            text += number[nstr[0] + "0"]
            }
            if ((n >= 20 && n <= 99)&&n%10!=0) {
                text += ' '+ number[n%10]
            }
            else  if(n >= 100 && n <= 999){
                text += number[nstr[0] + "00"]
                if (n%100!=0){
                    let nsrt2 = (n % 100).toString();
                    if(nsrt2 >= 1 && nsrt2 <= 19){
                        text += ' ' + number[nsrt2];
                    }
                    else if(nsrt2 >= 20 && nsrt2 <= 99){
                        text += ' ' + number[nsrt2[0] + "0"]
                        }
                        if ((nsrt2%10!=0)&&(nsrt2 >= 20 && nsrt2 <= 99)) {
                            text += ' ' + number[nsrt2%10]
                        }
                }
            }
    return text;
}

//Функция выбора случайного вопроса
function question(AN) {
    const QRandom = Math.round(Math.random()*4);
    const QPhrase = ['Вы загадали число '+AN+'?',
    'Ваше число '+AN+'?',
    'Может это '+AN+'?',
    'Число, о котором вы подумали, '+AN+'?',
    'Я думаю, что вы загадали '+AN+'. Верно?']
    answerField.innerText = QPhrase[QRandom];
}
//Функция выбора случайного ответа в случае успеха
function answerWin(){
    const WRandom = Math.round(Math.random()*4);
    const WPhrase = ['Я всегда угадываю.\n\u{1F60E}',
    'Я же говорил, что угадаю.\n\u{1F644}',
    'Я читаю ваши мысли!\n\u{1F60F}',
    'Это победа!\n\u{1F973}',
    'А я хорош в этом!\n\u{270C}']
    answerField.innerText = WPhrase[WRandom];
}
//Функция выбора случайного ответа в случае поражения
function answerFail(){
    const FRandom = Math.round(Math.random()*4);
    const FPhrase = ['Вы загадали неправильное число!\n\u{1F914}',
    'Я сдаюсь.\n\u{1F92F}',
    'Мне кажется, что вы меня обманываете...\n\u{1F925}',
    'Я не мог проиграть! Вы играете нечестно!\n\u{1F9D0}',
    'Ну как же так?! Начнем заново?\n\u{1F622}']
    answerField.innerText = FPhrase[FRandom];
}
//Обработчик кнопки "заново"
document.getElementById('btnRetry').addEventListener('click', function () {   
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameStart').style.display = 'block';
    document.getElementById('enter').style.display = 'none';
    orderNumber = 1;
    gameRun = true;
    document.getElementById('min').value ='';
    document.getElementById('max').value ='';
})
//Обработчик кнопки "больше"
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            answerFail();
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerNumberText = numToText(answerNumber);

            console.log(minValue);
            console.log(maxValue);
            console.log(answerNumber);
            console.log(answerNumberText);

            if(answerNumberText.length>20){
                question(answerNumber); 
            } else {
                question(answerNumberText);
            }
        }
    }
})
//Обработчик кнопки "меньше"
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            answerFail();
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerNumberText = numToText(answerNumber);

            console.log(minValue);
            console.log(maxValue);
            console.log(answerNumber);
            console.log(answerNumberText);

            if(answerNumberText.length>20){
                question(answerNumber);
            } else {
                question(answerNumberText);
            }
        }
    }
})
//Обработчик кнопки "верно"
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerWin();
        gameRun = false;
    }
})
//обработчик кнопки "Начать игру"
document.getElementById('start').addEventListener('click', function(){
    document.getElementById('enter').style.display = 'block';
})
//обработчик кнопки "Продолжить"
document.getElementById('continue').addEventListener('click', function(){
    let min = parseInt(document.getElementById('min').value);
    let max = parseInt(document.getElementById('max').value);
    let minValue2 = null;
    let maxValue2 = null;
    if (min>max){
        alert('Минимальное значение должно быть больше максимального');
    } else {
        if (min===0){minValue2=0} else{minValue2 = min || minV;};
        console.log(minValue2);
        if (max===0){maxValue2=0} else{maxValue2 = max || maxV;};
        console.log(maxValue2);

        minValue = minValue2<minV?minV:minValue2;
        maxValue = maxValue2>maxV?maxV:maxValue2;

        document.getElementById('container').style.display = 'block';
        document.getElementById('gameStart').style.display = 'none';
        answerNumber  = Math.floor((minValue + maxValue) / 2);
        orderNumberField.innerText = orderNumber;
        answerNumberText = numToText(answerNumber);

        console.log(min);
        console.log(max);
        console.log(minValue);
        console.log(maxValue);
        console.log(answerNumber);
        console.log(answerNumberText);
    
        if(answerNumberText.length>20){
            question(answerNumber); 
        } else {
            question(answerNumberText);
        }
    }
})
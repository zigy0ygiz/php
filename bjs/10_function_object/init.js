//Обработчик события клика на кнопку "Сгенерировать данные"
document.querySelector('#generate').addEventListener('click', function (){
    const initPerson = personGenerator.getPerson();
    document.querySelector('#firstNameOutput').innerText = initPerson.firstName;
    document.querySelector('#surnameOutput').innerText = initPerson.surname;
    document.querySelector('#genderOutput').innerText = initPerson.gender;
    document.querySelector('#birthYearOutput').innerText = initPerson.year + 'года';
    document.querySelector('#patronymicOutput').innerText = initPerson.patronymic;
    document.querySelector('#professionOutput').innerText = initPerson.profession;
    document.querySelector('#birthMonthOutput').innerText = initPerson.month;
    document.querySelector('#birthDayOutput').innerText = initPerson.day;
})

//Обработчик события клика на кнопку "Очистить результат"
document.querySelector('#clear').addEventListener('click', function(){
    personGenerator.clearPerson();
    document.querySelector('#firstNameOutput').innerText = '-';
    document.querySelector('#surnameOutput').innerText = '-';
    document.querySelector('#genderOutput').innerText = '-';
    document.querySelector('#birthYearOutput').innerText = '';
    document.querySelector('#patronymicOutput').innerText = '-';
    document.querySelector('#professionOutput').innerText = '-';
    document.querySelector('#birthMonthOutput').innerText = '';
    document.querySelector('#birthDayOutput').innerText = '-';
})

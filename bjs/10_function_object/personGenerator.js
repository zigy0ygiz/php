const personGenerator = {
    //Объект с фамилиями
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    //Объект с мужскими именами
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,

    //Объект с женскими именами
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Анастасия",
            "id_2": "Анна",
            "id_3": "Екатерина",
            "id_4": "Дарья",
            "id_5": "Юлия",
            "id_6": "Алёна",
            "id_7": "Ирина",
            "id_8": "Елизавета",
            "id_9": "Наталья",
            "id_10": "София"
        }
    }`,

    //Объект с основами для отчества
    patronymicJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александро",
            "id_2": "Максимо",
            "id_3": "Ивано",
            "id_4": "Артемо",
            "id_5": "Дмитрие",
            "id_6": "Сергее",
            "id_7": "Михайло",
            "id_8": "Данило",
            "id_9": "Егоро",
            "id_10": "Андрее"
        }
    }`,

    //Объект с профессиями
    professionJson: `{
        "count": 16,
        "list": {
            "id_1": "Врач",
            "id_2": "Бухгалтер",
            "id_3": "Продавец",
            "id_4": "Ученый",
            "id_5": "Программист",
            "id_6": "Инженер",
            "id_7": "Маляр",
            "id_8": "Плотник",
            "id_9": "Электрик",
            "id_10": "Редактор",
            "id_11": "Кондуктор",
            "id_12": "Кружевница",
            "id_13": "Фасовщица",
            "id_14": "Маникюрша",
            "id_15": "Педикюрша",
            "id_16": "Кастелянша"
        }
    }`,

    //Объект с месяцами
    MonthJson: `{
        "count": 12,
        "list": {
            "id_1": "Января",
            "id_2": "Февраля",
            "id_3": "Марта",
            "id_4": "Апреля",
            "id_5": "Мая",
            "id_6": "Июня",
            "id_7": "Июля",
            "id_8": "Августа",
            "id_9": "Сентября",
            "id_10": "Октября",
            "id_11": "Ноября",
            "id_12": "Декабря"
        }
    }`,

    GENDER_MALE: 'Мужской',
    GENDER_FEMALE: 'Женский',

     //метод для нахождения случайного числа в заданном диапазоне
     randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

     //Медод выбора случайного пункта списка. Необходимый список передается параметром 
     randomValue: function (json) {
         const obj = JSON.parse(json);
         const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
         return obj.list[prop];
     },

    //метод для генерации случайной фамилии
    randomSurname: function() {
        if (this.person.gender == 'Мужской'){
            return this.randomValue (this.surnameJson);
        } else {
            return this.randomValue (this.surnameJson)+'a';
        }
    },

    //метод для генерации случайного имени
    randomFirstName: function() {
        if (this.person.gender == 'Мужской'){
            return this.randomValue (this.firstNameMaleJson);
        } else {
            return this.randomValue(this.firstNameFemaleJson);
        }
    },
    
    //метод для генерации случайного отчества
    randomPatronymic: function(){
        if (this.person.gender == 'Мужской'){
            return this.randomValue (this.patronymicJson)+'вич';
        } else {
            return this.randomValue (this.patronymicJson)+'вна';
        }   
    },
    
    //метод для выбора пола
    randomGender: function (){
        const GEN = (this.randomIntNumber() == 1) ? this.GENDER_MALE : this.GENDER_FEMALE;
        return GEN;
    },

    //метод для генерации случайного года рождения
    randomYear: function(){
        return this.randomIntNumber(2023, 1923);
    },

    //метод для генерации случайного месяца рождения
    randomMonth: function(){
        return this.randomValue (this.MonthJson);
    },

    //метод для генерации случайного дня рождения
    randomDay: function(){
        const day30 = ["Апреля","Июня","Сентября","Ноября"]
        //Если выбранный месяц февраль, генерируем день от 1 до 28,
        //Если месяц из 30 дней, состоящий в массиве day30 - от 1 до 30,
        //Иначе от 01 до 31
        if (this.person.month=='Февраля'){
            return this.randomIntNumber(28, 1);
        } else if (day30.includes(this.person.month)){
            return this.randomIntNumber(30, 1);
        } else {
            return this.randomIntNumber(31, 1);
        }
    },

    //метод для генерации случайной профессии
    randomProfession: function(){
        const professionFemale = ["Кружевница","Фасовщица","Маникюрша","Педикюрша","Кастелянша"];
        let prof = this.randomValue(this.professionJson);
        while (professionFemale.includes(prof)&&this.person.gender == 'Мужской') {
            prof = this.randomValue(this.professionJson);
        }
        return prof;
    },

    //Метод для создания пользователя с необходимыми свойствами
    getPerson: function (){
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName();
        this.person.surname = this.randomSurname(); 
        this.person.patronymic = this.randomPatronymic();
        this.person.year = this.randomYear();
        this.person.month = this.randomMonth();
        this.person.day = this.randomDay();
        this.person.profession = this.randomProfession();
        return this.person;
    },

    //Метод для удаления пользователя
    clearPerson: function(){
        delete this.person;
    }
};

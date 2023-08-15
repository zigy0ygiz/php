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
        "count": 14,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артём",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей",
            "id_11": "Василий",
            "id_12": "Игорь",
            "id_13": "Данила",
            "id_14": "Вилли"
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
        const BASE_NAME = this.randomValue (this.firstNameMaleJson);
        const LBN = BASE_NAME.length;//длина строки с именем
        const LAST = BASE_NAME.slice(LBN-1,LBN);//последний символ имени
        const END = [
            ['Аникита','Никита','Мина','Савва','Сила','Фока'],
            ['б','в','г','д','ж','з','к','л','м','н','п','р','с','т','ф','х','ц','ч','ш','щ'],
            ['ж','ш','ч','щ','ц'],
            ['к','х','ц'],
            ['а','у','ы','о','e','и']];//массив для сравнения с исключениями и с символами в конкретном положении
        let suffix = (this.person.gender == 'Мужской')?'евич':'евна';//суффикс, добавляемый к имени

        
        if (END[0].includes(BASE_NAME)){//проверяем на исключения
            suffix = (this.person.gender == 'Мужской')?'ич':'ична';
            return BASE_NAME.slice(0,LBN-1) + suffix;  
        } else {

           if (END[1].includes(LAST)){//Если имя оканчивается на согласную
            if (END[2].includes(LAST)){//Если согласная в исключениях
                return BASE_NAME + suffix; 
            } else {
                suffix = (this.person.gender == 'Мужской')?'ович':'овна';
                if (BASE_NAME == 'Михаил'){//исключение имя Михаил, и преобразуется в й
                    return BASE_NAME.replace('ил','йл') + suffix;
                }
                return BASE_NAME + suffix;
            }

           } else if (LAST == 'й'){//Если имя заканчивается на й

            //переменные для сокращения кода с условием
            let A = BASE_NAME.slice(LBN-2,LBN)=='ий';//true если оканчивается на 'ий'
            let B = END[3].includes(BASE_NAME[LBN-3]);//true если 3 с конца символ в массиве END[3]
            let C = BASE_NAME.slice(LBN-4,LBN-2)=='нт';//true если 3 и 4 с конца сочетание 'нт'
            let D = END[1].includes(BASE_NAME[LBN-3]) && END[1].includes(BASE_NAME[LBN-4]); //true если 3 и 4 символы согласные

            if (A){

                if (B||(D&&!C)){
                    return BASE_NAME.slice(0,LBN-1) + suffix;
                }
                else {
                    return BASE_NAME.slice(0,LBN-2) + 'ь' + suffix;
                }
            }
           }
           if (END[4].includes(LAST)) {
            if (LAST == 'и'){
                return BASE_NAME + suffix;
            }else if (LAST == 'e'){
                return BASE_NAME.slice(0,LBN-1) + suffix;
            }
            suffix = (this.person.gender == 'Мужской')?'ович':'овна';
            return BASE_NAME.slice(0,LBN-1) + suffix;
           }
           return BASE_NAME.slice(0,LBN-1) + suffix; 
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

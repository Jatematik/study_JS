'use strict';

let lang = document.getElementsByTagName("html")[0].getAttribute("lang");
if (lang == 'ru') {
    alert('Понедельник, вторник, среда, четверг, пятница, суббота, воскреенье');
    console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскреенье');
}
else if (lang == 'en') {
    alert('Monday, tuesday, wednesday, thursday, friday, saturday, sunday');
    console.log('Monday, tuesday, wednesday, thursday, friday, saturday, sunday');
}

switch(lang){
    case 'ru':
        alert('Понедельник, вторник, среда, четверг, пятница, суббота, воскреенье');
        console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскреенье');
        break;
    case 'en':
        alert('Monday, tuesday, wednesday, thursday, friday, saturday, sunday');
        console.log('Monday, tuesday, wednesday, thursday, friday, saturday, sunday');
        break;
}

// Доделать
let days = {
    'ru' : 'Понедельник, вторник, среда, четверг, пятница, суббота, воскреенье',
    'en' : 'Monday, tuesday, wednesday, thursday, friday, saturday, sunday'
};

alert(days[lang]);

let namePerson = 'Артем';
let result = namePerson == 'Артем' ? 'директор' : 'студент';
console.log(result);

namePerson = 'Максим';
let result2 = namePerson == 'Максим' ? 'преподаватель' : 'студент';
console.log(result2);
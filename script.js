const translator = document.querySelector('.second .translator');
const input = document.querySelector('.input');
const lisFrom = document.querySelectorAll('.first .choose li.firstUl');
const lisTo = document.querySelectorAll('.second .choose li');
const btn = document.querySelector('.btn');
const langs = document.querySelector('.langs');
const more = document.querySelector('.more');
const moreLangs = document.querySelectorAll('.more .langs ul li');
let translation = '';
let fromLang = 'pl';
let toLang = 'en';
let lang;
const key = `trnsl.1.1.20190707T201153Z.e127b502ca8c8497.8d4de021cacefbe69e6f3ecf754746c2f092c15d`;

input.addEventListener('click', () => {
    input.value = '';
    translator.textContent = "";
})

lisFrom.forEach(li => {
    li.addEventListener('click', () => {
        more.addEventListener('click', moreFun);
        langs.classList.remove('activeLangs');
        more.classList.remove('active');
        lisFrom.forEach(li => li.classList.remove('active'));
        li.classList.add('active');
        fromLang = li.dataset.lang;
    })
});

const moreFun = (e) => {
    console.log('click1');
    lisFrom.forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    langs.classList.add('activeLangs');
    more.removeEventListener('click', moreFun, false);
}

more.addEventListener('click', moreFun);


moreLangs.forEach(li => {
    li.addEventListener('click', () => {
        moreLangs.forEach(li => li.classList.remove('active'));
        li.classList.add('active');
        fromLang = li.dataset.lang;
        langs.classList.remove('activeLangs');
        lisFrom[1].textContent = li.textContent;
        lisFrom[1].dataset.lang = li.dataset.lang;
        lisFrom[1].classList.add('active');
        more.classList.remove('active');
        setTimeout(() => {
            more.addEventListener('click', moreFun);
        }, 500)
    })
})

btn.addEventListener('click', e => {
    e.preventDefault()
    if (input.value.length !== 0) {
        if (fromLang === "detect") {
            detect(input.value);
        } else {
            translate(input.value);
            console.log(fromLang);
        }
    }
})

input.addEventListener('keydown', e => {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        if (input.value.length !== 0) {
            if (fromLang === "detect") {
                detect(input.value);
            } else {
                translate(input.value);
            }
        }
    }
})

// lisTo.forEach(li => {
//     li.addEventListener('click', e => {
//         lisTo.forEach(li => li.classList.remove('active'));
//         e.target.classList.toggle('active');
//         toLang = e.target.dataset.lang;
//     })
// })

const translate = (text) => {
    console.log(fromLang);
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${fromLang}-${toLang}&[format=plain]`)
        .then(response => {
            if (response.ok) return response;
            else return;
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            translator.textContent = data.text[0];
        })
}

const detect = (text) => {
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/detect?key=${key}&text=${text}`)
        .then(response => {
            if (response.ok) return response
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            getLang(data.lang);
        })
}

const getLang = (lang) => {
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=${key}`)
        .then(response => {
            if (response.ok) return response
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.langs[lang]);
        })
}
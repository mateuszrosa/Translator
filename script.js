const translator = document.querySelector('.second .translator');
const input = document.querySelector('.input');
const lisFrom = document.querySelectorAll('.first .choose li');
const lisTo = document.querySelectorAll('.second .choose li');
const btn = document.querySelector('button');
const langs = document.querySelector('.langs');
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
    li.addEventListener('click', e => {
        lisFrom.forEach(span => span.classList.remove('active'));
        e.target.classList.toggle('active');
        if (e.target.classList.contains('more')) {
            langs.classList.toggle("activeLangs")
            langs.querySelectorAll("ul li").forEach(li => {
                li.addEventListener('click', e => {
                    console.log(e.target);
                })
            })
        } else {
            langs.classList.remove("activeLangs")
            fromLang = e.target.dataset.lang;
        }
    })
})

btn.addEventListener('submit', e => {
    e.target.preventDefault()
    console.log('work');
    if (input.value.length !== 0) {
        if (fromLang === "detect") {
            detect(input.value);
        } else {
            translate(input.value);
        }
    }
})

input.addEventListener('input', e => {
    // console.log(e.target.value);
})

lisTo.forEach(li => {
    li.addEventListener('click', e => {
        lisTo.forEach(li => li.classList.remove('active'));
        e.target.classList.toggle('active');
        toLang = e.target.dataset.lang;
    })
})

const translate = (text) => {
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
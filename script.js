const translator = document.querySelector('.second .translator');
const input = document.querySelector('.input');
const spansFrom = document.querySelectorAll('.first .choose span');
const spansTo = document.querySelectorAll('.second .choose span');
const btn = document.querySelector('button');
let translation = '';
let fromLang = 'pl';
let toLang = 'en'
const key = `trnsl.1.1.20190707T201153Z.e127b502ca8c8497.8d4de021cacefbe69e6f3ecf754746c2f092c15d`;

input.addEventListener('click', () => {
    input.value = '';
    translator.textContent = "";
})

btn.addEventListener('click', () => {
    if (input.value.length !== 0) {
        if (fromLang === "detect") {
            detect(input.value);
        } else {
            translate(input.value);
        }
    }
})

spansFrom.forEach(span => {
    span.addEventListener('click', e => {
        spansFrom.forEach(span => span.classList.remove('active'));
        e.target.classList.toggle('active');
        if (e.target.dataset.lang === "detect") {
            fromLang = 'detect';
        } else {
            fromLang = e.target.dataset.lang;
        }
        console.log(fromLang);
    })
})

spansTo.forEach(span => {
    span.addEventListener('click', e => {
        spansTo.forEach(span => span.classList.remove('active'));
        e.target.classList.toggle('active');
        toLang = e.target.dataset.lang;
    })
})

const translate = (text) => {
    console.log(object);
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${fromLang}-${toLang}&[format=plain]`)
        .then(response => {
            if (response.ok) return response;
            else return;
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
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
            console.log(data.lang);
        })
}
const translator = document.querySelector('.second .translator');
const input = document.querySelector('.input');
const spans = document.querySelectorAll('.choose span');
const btn = document.querySelector('button');
let translation = '';
let fromLang = 'en';
let toLang = 'pl'
const key = `trnsl.1.1.20190707T201153Z.e127b502ca8c8497.8d4de021cacefbe69e6f3ecf754746c2f092c15d`;

input.addEventListener('click', () => {
    input.value = '';
})

btn.addEventListener('click', () => {
    translate(input.value);
})

spans.forEach(span => {
    span.addEventListener('click', e => {
        spans.forEach(span => span.classList.remove('active'));
        e.target.classList.toggle('active');
        fromLang = e.target.dataset.lang;
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

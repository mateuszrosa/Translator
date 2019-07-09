const first = document.querySelector('.first');
const second = document.querySelector('.second');
const input = document.querySelector('.input');
const spans = document.querySelectorAll('.choose span');
let text = '';
const key = `trnsl.1.1.20190707T201153Z.e127b502ca8c8497.8d4de021cacefbe69e6f3ecf754746c2f092c15d`;

input.addEventListener('input', e => {
    text = e.target.value;
    translate();
});

spans.forEach(span => {
    span.addEventListener('click', () => {
        console.log('span');
    })
})

translate = () => {
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=en-pl&[format=plain]`)
        .then(response => {
            return response;
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            second.textContent = data.text[0]
        })
}
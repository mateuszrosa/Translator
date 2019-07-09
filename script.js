const first = document.querySelector('.first');
const second = document.querySelector('.second');
const input = document.querySelector('.input');
let text = '';
const key = `trnsl.1.1.20190707T201153Z.e127b502ca8c8497.8d4de021cacefbe69e6f3ecf754746c2f092c15d`;


input.addEventListener('click', e => {
    input.querySelector('span').textContent = '';
})

input.addEventListener('input', e => {
    text = e.target.textContent;
    translate();
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
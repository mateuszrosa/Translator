const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(input.value);
    input.value = '';
})
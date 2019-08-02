const translator = document.querySelector('.second .translator');
const input = document.querySelector('.input');
const lisFrom = document.querySelectorAll('.first .choose li.firstUl');
const lisTo = document.querySelectorAll('.second .choose li');
const btn = document.querySelector('.btn');
const langs = document.querySelector('.langs');
const more1st = document.querySelector('.more');
const more2nd = document.querySelector('.second .more');
const moreLangs = document.querySelectorAll('.container .langs ul li');
let translation = '';
let fromLang = 'pl';
let toLang = 'en';
let lang;
const key = `trnsl.1.1.20190707T201153Z.e127b502ca8c8497.8d4de021cacefbe69e6f3ecf754746c2f092c15d`;
const moreUl1 = document.querySelector('.container .langs ul');
const moreUl2 = document.querySelector('.container .langs ul:nth-child(2)');
const moreUl3 = document.querySelector('.container .langs ul:nth-child(3)');
const moreUl4 = document.querySelector('.container .langs ul:nth-child(4)');
const quit = document.querySelector('.fa-times');

input.addEventListener('click', () => {
    input.value = '';
    translator.textContent = "";
})

lisFrom.forEach(li => {
    li.addEventListener('click', () => {
        if (more1st.classList.contains('active')) {
            langs.classList.remove('activeLangs');
        }
        more1st.addEventListener('click', moreFun);
        more1st.classList.remove('active');
        lisFrom.forEach(li => li.classList.remove('active'));
        li.classList.add('active');
        fromLang = li.dataset.lang;
    })
});

const moreFun = (e, more, lis, langs) => {
    lis.forEach(li => li.classList.remove('active'));
    e.target.parentNode.classList.add('active');
    langs.classList.add('activeLangs');
    more.removeEventListener('click', moreFun, false);
}

more1st.addEventListener('click', (e) => moreFun(e, more1st, lisFrom, langs));

lisTo.forEach(li => {
    li.addEventListener('click', () => {
        if (more2nd.classList.contains('active')) {
            langs.classList.remove('activeLangs');
        }
        lisTo.forEach(li => li.classList.remove('active'))
        li.classList.add('active');
        toLang = li.dataset.lang;
    })
});

more2nd.addEventListener('click', (e) => moreFun(e, more2nd, lisTo, langs));

btn.addEventListener('click', e => {
    e.preventDefault()
    if (input.value.length !== 0) {
        if (fromLang === "detect") {
            detect(input.value);
        } else {
            translate(input.value);
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

fetch(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=${key}`)
    .then(response => {
        if (response.ok) return response
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        fillMore(data.langs);
    })

const fillMore = (data) => {
    // const ordered = {};
    // Object.keys(data).sort().forEach(function (key, value) {
    //     console.log(key);
    //     console.log(data[key]);
    //     ordered[key] = data[key]
    //     ordered[value] = key;
    // });
    // console.log(ordered);
    let counter = 0;
    let obj = {};
    for (let [key, value] of Object.entries(data)) {
        counter++;
        obj[key] = value;
        obj[value] = key;
        newLi = document.createElement('li');
        newLi.textContent = value;
        newLi.dataset.lang = key;
        if (counter <= 23) {
            moreUl1.appendChild(newLi);
        } else if (counter > 23 && counter <= 46) {
            moreUl2.appendChild(newLi);
        } else if (counter > 46 && counter <= 69) {
            moreUl3.appendChild(newLi);
        } else {
            moreUl4.appendChild(newLi);
        }
    }
    let newLis = document.querySelectorAll('.langs ul li');
    newLis.forEach(newLi => {
        newLi.addEventListener('click', e => {
            newLis.forEach(newLi => newLi.classList.remove('active'));
            newLi.classList.add('active');
            if (more1st.classList.contains('active')) {
                lisFrom[1].textContent = e.target.textContent;
                lisFrom[1].dataset.lang = e.target.dataset.lang;
                lisFrom[1].classList.add('active');
                more1st.classList.remove('active');
                fromLang = e.target.dataset.lang;
            } else if (more2nd.classList.contains('active')) {
                lisTo[0].textContent = e.target.textContent;
                lisTo[0].dataset.lang = e.target.dataset.lang;
                lisTo[0].classList.add('active');
                more2nd.classList.remove('active');
                toLang = e.target.dataset.lang;
            }
            langs.classList.remove('activeLangs');
        })
    })
}

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
            li = document.querySelectorAll('li.firstUl');
            li.forEach(li => li.classList.remove('active'));
            lisFrom[1].textContent = data.langs[lang];
            lisFrom[1].dataset.lang = lang;
            lisFrom[1].classList.add('active');
            fromLang = lang;
            translate(input.value);
        })
}

quit.addEventListener('click', () => {
    langs.classList.remove('activeLangs');
    if (more1st.classList.contains('active')) {
        more1st.classList.remove('active')
        lisFrom[1].classList.add('active');
        fromLang = lisFrom[1].dataset.lang;
    } else {
        more2nd.classList.remove('active');
        lisTo[1].classList.add('active');
        toLang = lisTo[1].dataset.lang;
    }
})
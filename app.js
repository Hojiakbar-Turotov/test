let n = [];
let overQues = [];
let countQues = 1;
function openQues() {
    closeQues(quesDb);

    for (let i = 0; i < 10; i++) {
        if((n[i] == quesDb[0]) || (n[i] == quesDb[1]) || (n[i] == quesDb[2]) || (n[i] == quesDb[3]) || (n[i] == quesDb[4]) || (n[i] == quesDb[5]) || (n[i] == quesDb[6]) || (n[i] == quesDb[7]) || (n[i] == quesDb[8]) || (n[i] == quesDb[9])){
            continue;
        } else{
            if ((document.getElementById(`a${n[i]}`).checked)) {
                overQues.push(n[i]);
                n.splice(0 , 1);
                quesDb[countQues].classList.add('active');
                countQues++;
                break;
            } else if ((document.getElementById(`b${n[i]}`).checked)) {
                overQues.push(n[i])
                n.splice(0, 1);
                quesDb[countQues].classList.add('active');
                countQues++;
                break;
            } else if ((document.getElementById(`c${n[i]}`).checked)) {
                overQues.push(n[i])
                n.splice(0, 1);
                quesDb[countQues].classList.add('active');
                countQues++;
                break;
            } else if ((document.getElementById(`d${n[i]}`).checked)) {
                overQues.push(n[i])
                n.splice(0, 1);
                quesDb[countQues].classList.add('active');
                countQues++;
                break;  
            }

        }
    }
}
function closeQues(x) {
    for (let i = 0; i < x.length; i++) {
        x[i].classList.remove('active');
    }
}
let quesDb = null;

window.onload = function () {
    // document.getElementById("start").addEventListener(`click`, function () {
    document.getElementById(`login`).classList.add(`d-none`);
    document.getElementById(`preloader`).classList.remove(`d-none`);
    testing();
    // })
}
const url = `https://hojiakbar-turotov.github.io/API/level-0.json`;
let db = {};
let prin = null;
let i;
function testing() {
    // 1-ish malumotlar ba'zasidan savollarni olib kelish va ekranga random qilib chiqarish

    fetch(url)
        .then(response => response.json())
        .then(dbJson => { db = dbJson });

    /* malumotlar ekranga random qilib chiqarish */
    prin = setInterval(frame, 500);

    function frame() {
        i = Math.floor(Math.random() * db.length);
        if ((n.length < 10) && (n[0] != i) && (n[1] != i) && (n[2] != i) && (n[3] != i) && (n[4] != i) && (n[5] != i) && (n[6] != i) && (n[7] != i) && (n[8] != i) && (n[9] != i)) {
            n.push(i);
        } else if (n.length > 9) {
            clearInterval(prin);
            console.log('tugadi');
            for (let i = 0; i < 10; i++) {
                document.getElementById(`question${i}`).innerHTML = `
        <div class="ques">
            <div class="question">${db[n[i]].question} </div>
           <div class="anws">
           
            <input type="radio" name="check${i}" id="a${n[i]}">
            <label for="a${n[i]}" id="a${n[i]}L">${db[n[i]].anwers0}</label>
           </div>
           <div class="anws">
            <input type="radio" name="check${i}" id="b${n[i]}">
            <label for="b${n[i]}" id="b${n[i]}L">${db[n[i]].anwers1}</label>
            </div>
            <div class="anws">
             <input type="radio" name="check${i}" id="c${n[i]}">
            <label for="c${n[i]}" id="c${n[i]}L">${db[n[i]].anwers2}</label>
            </div>
            <div class="anws">
             <input type="radio" name="check${i}" id="d${n[i]}">
            <label for="d${n[i]}" id="d${n[i]}L">${db[n[i]].anwers3}</label>
            </div>
            </div>
        `
            }
            document.getElementById(`preloader`).style.display = 'none';
            document.getElementById(`res`).classList.remove(`d-none`);
        }
    }

// natijani hisoblash
let res = document.getElementById(`res`);
let natija = 0;

res.onclick = function () {
    natija = 0;
    for (let i = 0; i < 10; i++) {
        if ((document.getElementById(`a${n[i]}`).checked) && (document.getElementById(`a${n[i]}L`).innerHTML == db[n[i]].anw)) {
            natija = +natija + 1;
        } else if ((document.getElementById(`b${n[i]}`).checked) && (document.getElementById(`b${n[i]}L`).innerHTML == db[n[i]].anw)) {
            natija = +natija + 1;
        } else if ((document.getElementById(`c${n[i]}`).checked) && (document.getElementById(`c${n[i]}L`).innerHTML == db[n[i]].anw)) {
            natija = +natija + 1;
        } else if ((document.getElementById(`d${n[i]}`).checked) && (document.getElementById(`d${n[i]}L`).innerHTML == db[n[i]].anw)) {
            natija = +natija + 1;
        }
    }
    res.innerHTML = natija
}
quesDb = document.querySelectorAll('.savol');
}






function tQ() {
    for (let i = 0; i < 10; i++) {
        document.getElementById(`a${n[i]}`).onclick = function () {
            openQues();
        };
        document.getElementById(`b${n[i]}`).onclick = function () {
            openQues();
        };
        document.getElementById(`c${n[i]}`).onclick = function () {
            openQues();
        };
        document.getElementById(`d${n[i]}`).onclick = function () {
            openQues();
        };
    }

}
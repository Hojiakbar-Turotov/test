// Boshlash
window.onload = function () {
    // testing();
    let btn = document.querySelector(`#login .btn`);
    btn.onclick = loginFO;
}


// db
const resdb = `https://hojiakbar-turotov.github.io/API/users.json`;
let dbRes = {};
fetch(resdb)
    .then(response => response.json())
    .then(dbJson2 => { dbRes = dbJson2 });





// Loading

function loginFO() {
    document.querySelector(`#login .up`).innerHTML = `
    <label for="loginUser">Login</label>
                <input type="text" id="loginUser">
                <label for="passwordUser">Parol</label>
                <input type="password" id="passwordUser">
                <div class="btnReg btns">Ro'yxatdan o'tish</div>
                <div class="btnLog btns">Kirish</div>
                `;
    document.querySelector(`#login .btnLog`).onclick = userLog;
    document.querySelector(`#login .btnReg`).onclick = userReg;
}


function userLog() {
    let userdt = [
        document.getElementById(`loginUser`).value,
        document.getElementById(`passwordUser`).value
    ];
    let alr = 0;
    for (let i = 0; i < Object.keys(dbRes).length; i++) {
        if ((dbRes[`user${i}`].name == '') || (dbRes[`user${i}`].name == null)) {
            alr = 1;
            continue;
        } else if ((dbRes[`user${i}`].login == userdt[0]) && (dbRes[`user${i}`].pass == userdt[1])) {
            document.getElementById(`login`).innerHTML = `
            <div id="start" class="btn">Boshlash</div>
            `;
            document.getElementById("start").addEventListener(`click`, function () {
                document.getElementById(`login`).classList.add(`d-none`);
                document.getElementById(`preloader`).classList.remove(`d-none`);
                testing();
            })

            alr = 0;
            break;
        } else {
            alr = 1;
            continue;
        }
    }
    if (alr == 1) {
        alert(`Bunday foydalanuvchi topilmadi. Test yechmoqchi bo'lsangiz ro'yxatdan o'ting`)
    }
}

function userReg() {
    document.getElementById(`login`).style.top = 0;
    document.getElementById(`login`).style.position = `absolute`;
    document.getElementById(`login`).style.transform = `translate(-50%, 0%)`;
    document.querySelector(`#login .up`).innerHTML = `
    <label><b> Ro'yxatdan o'tish</b> </label> <br>
    <label for="familyaUser">Familya:</label>
    <input type="text" id="familyaUser" placeholder="Davlatov">
    <label for="nameUser">Ism:</label>
    <input type="text" id="nameUser" placeholder="Davlatbek">
    <label for="eduUser" title="Institut Fakultet Yo'nalish">Ta'lim:</label>
    <input type="text" id="eduUser" placeholder="JDPI Fizika va Texnologik ta'lim fakulteti Fizika va Astronimiya yo'nalishi">
    <label for="kursUser">Kurs:</label>
    <input type="text" id="kursUser" placeholder="2-kurs">
    <label for="othersUser">Qo'shimcha:</label>
    <input type="text" id="othersUser" placeholder="O'z fikringiz kiritishingiz mumkin">
    <label for="loginUser">Login</label>
    <input type="text" id="loginUser" placeholder="tizimda o'zingiz uchun maxsus nom yarating">
    <label for="passwordUser">Parol</label>
    <input type="password" id="passwordUser" placeholder="Maxfiyligingizni taminlang">
    <div class="btnReg btns">Saqlash</div>
    `;
    document.querySelector(`#login .btnReg`).onclick = userSave;
}

function userSave() {
    let userdt = [
        document.getElementById(`loginUser`).value,
        document.getElementById(`passwordUser`).value,
        document.getElementById(`familyaUser`).value,
        document.getElementById(`nameUser`).value,
        document.getElementById(`eduUser`).value,
        document.getElementById(`kursUser`).value,
        document.getElementById(`othersUser`).value
    ];
    let xolat = 0;
    for (let i = 0; i < Object.keys(dbRes).length; i++) {
        if ((dbRes[`user${i}`].login == userdt[0])) {
            alert(`Bu foydalanuvchi nomi band!`);
            xolat = 1;
            break;
        } else {
            xolat = 0;
        }
    }

    if (!xolat) {

        if (
            (userdt[0] != '') &&
            (userdt[1] != '') &&
            (userdt[2] != '') &&
            (userdt[3] != '') &&
            (userdt[4] != '') &&
            (userdt[5] != '')
        ) {
            for (let i = 0; i < Object.keys(dbRes).length; i++) {
                if ((dbRes[`user${i}`].name == '') || (dbRes[`user${i}`].name == null)) {
                    dbRes[`user${i}`].login = userdt[0];
                    dbRes[`user${i}`].pass = userdt[1];
                    dbRes[`user${i}`].surName = userdt[2];
                    dbRes[`user${i}`].name = userdt[3];
                    dbRes[`user${i}`].edu = userdt[4];
                    dbRes[`user${i}`].kurs = userdt[5];
                    dbRes[`user${i}`].others = userdt[6];
                    break;
                }
            }

            fetch(resdb, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dbRes)
            }).then(response => {
                return response.json()
            })

            document.querySelector(`#login .up`).innerHTML = `
        <label>Tabriklaymiz! Siz ro'yxatdan mufaqqiyatli o'tdingiz. Sahifani qayta yuklab test sinovlarida qatnashishingiz mumkin. </label>
        `;

        } else {
            alert(`Ro'yxatdan o'tish uchun asosiy ma'lumotlarni kiriting!`)
        }
    }
}
























/*testing Func */
function testing() {
    // 1-ish malumotlar ba'zasidan savollarni olib kelish va ekranga random qilib chiqarish
    const url = `https://hojiakbar-turotov.github.io/API/level-0.json`;
    let db = {};

    fetch(url)
        .then(response => response.json())
        .then(dbJson => { db = dbJson });

    function func() {
        setTimeout(function () {
            document.getElementById(`preloader`).style.display = 'none';
        }, 1000)
        console.log(db);
    }
    /* malumotlar ekranga random qilib chiqarish */
    let n = [];
    let prin = setInterval(frame, 500);
    let i;

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
}

// // natijani hisoblash
// let res = document.getElementById(`res`);
// let natija = 0;

// res.onclick = function () {
//     natija = 0;
//     for (let i = 0; i < 10; i++) {
//         if ((document.getElementById(`a${n[i]}`).checked) && (document.getElementById(`a${n[i]}L`).innerHTML == db[n[i]].anw)) {
//             natija = +natija + 1;
//         } else if ((document.getElementById(`b${n[i]}`).checked) && (document.getElementById(`b${n[i]}L`).innerHTML == db[n[i]].anw)) {
//             natija = +natija + 1;
//         } else if ((document.getElementById(`c${n[i]}`).checked) && (document.getElementById(`c${n[i]}L`).innerHTML == db[n[i]].anw)) {
//             natija = +natija + 1;
//         } else if ((document.getElementById(`d${n[i]}`).checked) && (document.getElementById(`d${n[i]}L`).innerHTML == db[n[i]].anw)) {
//             natija = +natija + 1;
//         }
//     }
//     res.innerHTML = natija
// }







    //
/* res.onclick = function () {
    let a1 = document.querySelector("#a1");
    let b1 = document.querySelector("#b1");
    let c1 = document.querySelector("#c1");
    let d1 = document.querySelector("#d1");
    if (a1.checked) {
        res.innerHTML = `Javobingiz to'g'ri`;
    } else if (b1.checked) {
        res.innerHTML = `Javobingiz noto'g'ri`;
    } else if (c1.checked) {
        res.innerHTML = `Javobingiz noto'g'ri`;
    } else if (d1.checked) {
        res.innerHTML = `Javobingiz noto'g'ri`;
    } else {
        res.innerHTML = `Siz javob belgilamadingiz`;
    }
    document.getElementById("question1").innerHTML = ``;
    // res
    dbRes.hojiakbar.result = +dbRes.hojiakbar.result + 1;
    fetch(resdb, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dbRes)
    }).then(response => {
        return response.json()
    })
}
*/
    // savollarni aralashtirib chiqarish
const nextBtn = document.getElementById('next-step');
const goBackBtn = document.getElementById('go-back');
const fnum = document.getElementsByClassName('form-number');

var slideValue = 1;
const subform1 = document.getElementById('sub-form-1');
const subform2 = document.getElementById('sub-form-2');
const subform3 = document.getElementById('sub-form-3');
const subform4 = document.getElementById('sub-form-4');
const thankYou = document.getElementById('thankyou');

const form1 = document.getElementsByClassName('full-input');
const error = document.getElementsByClassName('warnings');

const plans = document.getElementsByClassName('plan');
const planDuration = document.getElementsByClassName('plan-duration');
const addon = subform3.getElementsByClassName('add-on');
const checkBox = subform3.getElementsByClassName('check-box');
const special = document.getElementsByClassName('special');
const warnings2 = document.getElementsByClassName('warnings2');
const addOnCost = subform3.getElementsByClassName('add-on-cost');
const planCost = document.getElementsByClassName('plan-cost');
const switchbtn = document.getElementById('switch-btn');

const allItemssub = document.getElementsByClassName('all-sub-items');
const totalCost = document.getElementById('total-cost');
const scheme = document.getElementById('scheme');
const mainCost = document.getElementById('main-cost');
const change = document.getElementsByClassName("total-sub");

const onlynum = /\d+/g;
var total = 0;
var periodDuration = "Monthly";

function nextForm() {
    if (checkValidation1()) {
        slideValue = 2;
    }
    if (checkValidation2()) {
        slideValue = 3;
    }
    if (checkValidation3()) {
        slideValue = 4;
    }
    if (nextBtn.innerText === "Confirm") {
        slideValue = 5;
    }
    HideGoBackButton();
    changeSlide();
}

function goBack() {
    slideValue -= 1;
    HideGoBackButton();
    changeSlide();
}

function HideGoBackButton() {
    if (slideValue === 5) {
        goBackBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
    else {
        goBackBtn.style.visibility = slideValue === 1 ? "hidden" : "visible";
    }
}

function checkValidation1() {
    for (let i = 0; i < form1.length; i++) {
        if (form1[i].value == '') {
            form1[i].style = "border-color: red;";
            error[i].innerText = "This field can't be empty";
            return false;
        }
        else {
            form1[i].style = "";
            error[i].innerText = "";
        }
        if (form1[i] === form1[0] && (form1[i].value.length < 8 || form1[i].value.length > 40)) {
            form1[i].style = "border-color: red;";
            error[i].innerText = "Enter valid Fullname";
            return false;
        }
        else if (form1[i] === form1[1]) {
            let email = form1[i].value.trim();
            let validate = /\S+@\S+\.\S+/;
            if (!validate.test(email)) {
                form1[i].style = "border-color: red;";
                error[i].innerText = "Enter valid Email";
                return false;
            }
        }
        else if (form1[i] === form1[2]) {
            let num = form1[i].value;
            let validate = /^\d{10}$/;
            if (!validate.test(num)) {
                form1[i].style = "border-color: red;";
                error[i].innerText = "Enter valid Number";
                return false;
            }
        }
    }
    return true;
}

for (let i of plans) {
    i.addEventListener("click", () => {
        if (i.style.backgroundColor == "") {
            for (let j of plans) j.style = "";
            i.style = "background-color: hsl(243, 100%, 62%,5%);border-color:hsl(243, 100%, 62%);"
        }
        else
            i.style = "";
    });
}
checkValidation2();

function checkValidation2() {
    let check = false;
    let j = -1;
    for (let i of plans) {
        j++;
        if (i.style.backgroundColor !== "") {
            mainCost.innerHTML = planCost[j].innerText;
            check = true;
            break;
        }

    }
    if (check) {
        warnings2[0].innerText = "";
    }
    else {
        warnings2[0].innerText = "Select at least one plan";
    }
    return check;
}

switchbtn.addEventListener("change", () => {
    if (switchbtn.checked) {
        planDuration[0].style = "";
        planDuration[1].style = "color: hsl(213, 96%, 18%); opacity: 1;";
        for (let i of special) {
            i.innerText = "2 Months Free";
        }
        allMonthToYear();
    }
    else {
        planDuration[0].style = "color: hsl(213, 96%, 18%); opacity: 1;";
        planDuration[1].style = "";
        for (let i of special) {
            i.innerText = "";
        }
        allYearToMonth();
    }
});

function allMonthToYear() {
    for (let i = 0; i < planCost.length; i++) {
        planCost[i].innerText = monthToYear(planCost[i].innerText);
        addOnCost[i].innerText = monthToYear(addOnCost[i].innerText);
    }
    periodDuration = "Yearly";
}

function monthToYear(text) {
    let mty = text.match(onlynum);
    let year = parseInt(mty) * 10;
    return `$${year}/yr`;
}

function allYearToMonth() {
    for (let i = 0; i < planCost.length; i++) {
        planCost[i].innerText = yearToMonth(planCost[i].innerText);
        addOnCost[i].innerText = yearToMonth(addOnCost[i].innerText);
    }
    periodDuration = "Monthly";
}

function yearToMonth(text) {
    let ytm = text.match(onlynum);
    let month = parseInt(ytm) / 10;
    return `+$${month}/mo`;
}

function checkValidation3() {
    let check = false;
    let total = 0;
    allItemssub[0].innerHTML = "";

    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked) {
            check = true;
            total += parseInt(addon[i].querySelector('.add-on-cost').innerText.match(onlynum));
            itemList(addon[i]);
        }
    }

    const mainCostValue = parseInt(mainCost.innerText.match(onlynum));
    total += mainCostValue;

    let periodLabel;
    if (periodDuration === "Yearly") {
        periodLabel = "yr";
    } else {
        periodLabel = "mo";
    }

    totalCost.innerHTML = `<span class="step3period">$${total}/${periodLabel}</span>`;
    // changeSlide();
    return check;
}

function itemList(item) {
    const itemName = item.querySelector('.add-on-name').innerText;
    const itemCost = item.querySelector('.add-on-cost').innerText;

    allItemssub[0].innerHTML +=
        `<div class="total-sub-items">
        <p class="sub-name">${itemName}</p>
        <p class="sub-cost"><span class="step3period">${itemCost}</span></p>
    </div>`;
}

change[0].addEventListener("click", () => {
    if (switchbtn.checked) {
        switchbtn.checked = false;
        allYearToMonth();
    } else {
        switchbtn.checked = true;
        allMonthToYear();
    }
});

function forwardChangeSteps() {
    for (var i = 0; i < slideValue; i++) {
        if (fnum[i].innerText == slideValue) {
            fnum[i].style = "color: blue; background-color: hsl(206, 94%, 87%);";
        }
        else {
            fnum[i].style = "";
        }
    }
}

function backwardChangeSteps() {
    for (var i = slideValue; i < fnum.length; i++) {
        if (fnum[i].innerText == slideValue) {
            fnum[i].style = "color: blue; background-color: hsl(206, 94%, 87%);";
        }
        else {
            fnum[i].style = "";
        }
    }
}

function changeSlide() {
    if (slideValue === 1) {
        subform1.style.display = "block";
        subform2.style.display = "none";
        subform3.style.display = "none";
        subform4.style.display = "none";
        nextBtn.innerText = "Next Step";
    }
    else if (slideValue === 2) {
        subform1.style.display = 'none';
        subform2.style.display = "block";
        subform3.style.display = "none";
        subform4.style.display = "none";
        nextBtn.innerText = "Next Step";
    }
    else if (slideValue === 3) {
        subform1.style.display = "none";
        subform2.style.display = 'none';
        subform3.style.display = 'block';
        subform4.style.display = "none";
        nextBtn.innerText = "Next Step";

    }
    else if (slideValue === 4) {
        subform1.style.display = "none";
        subform2.style.display = "none";
        subform3.style.display = 'none';
        subform4.style.display = 'block';
        nextBtn.innerText = "Confirm";
    }
    else if (slideValue === 5) {
        thankYou.style.display = 'block';
        subform4.style.display = 'none';
    }
    forwardChangeSteps();
    backwardChangeSteps();
}
changeSlide();


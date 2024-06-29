const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goalText')
const progress = document.getElementById("prgressValue")
const msg = document.getElementById("message")

var progressIncrement = 1;
var i = 0;

var allGoals = {
    first:{
        goal:'goal 1',
        status: false
    },
    first:{
        goal:'goal 2',
        status: false
    },
    first:{
        goal:'goal 3',
        status: false
    }
}
allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
function messageText(i) {
    if (i == 1) {
        msg.innerText = 'Well begun is half done!';
    }
    else if (i == 2) {
        msg.innerText = 'Just a step away, keep going!';
    }
    else if (i == 3) {
        msg.innerText = 'Whoa! You just completed all the goals, time for chill :D';
    }
    else {
        msg.innerText = 'Raise the bar by completing your goals!';
    }
    return msg.innerText;
}

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const filledAll = [...inputFields].every((input) => {
            return input.value
        })
        if (filledAll) {
            checkbox.parentElement.classList.toggle('completed')
            const input = checkbox.nextElementSibling;
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].status = !allGoals[inputId].status
            console.log(allGoals[inputId].status)
            if (allGoals[inputId].status == true) {
                input.disabled = true
                i++;
                messageText(i);
                progressIncrement = (i / 3) * 100;
                progress.style.visibility = 'visible';
                progress.style.width = `${progressIncrement}%`;
                progress.innerText = `${i}/3`;
            }
            else if (allGoals[inputId].status == false) {
                input.disabled = false
                i--;
                messageText(i);
                progressIncrement = (i / 3) * 100;
                progress.style.width = `${progressIncrement}%`;
                if (i == 0) {
                    progress.innerText = '';
                }
                else {
                    progress.innerText = `${i}/3`;
                }
            }
            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        }
        else {
            const warn = document.getElementById("warning")
            warn.style.display = "block"
        }
    })
})

inputFields.forEach((input) => {
    // input.value = allGoals[input.id].goal

    input.addEventListener('click', () => {
        const warn = document.getElementById("warning")
        warn.style.display = "none"
    })

    input.addEventListener('input', () => {
        allGoals[input.id] = {
            goal: input.value,
            status: false
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    })
})

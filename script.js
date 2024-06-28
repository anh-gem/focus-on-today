const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goalText')
const progress = document.getElementById("prgressValue")

var progressIncrement = 1;
var i = 0;

var allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const filledAll = [...inputFields].every((input) => {
            return input.value
        })
        if (filledAll) {
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].status = !allGoals[inputId].status
            console.log( allGoals[inputId].status)
            if(allGoals[inputId].status == true){
            i++;
            progressIncrement = (i/3)*100;
            progress.style.visibility ='visible';
            progress.style.width =`${progressIncrement}%`;
            progress.innerText = `${i}/3`;
            }
            else if(allGoals[inputId].status == false){
            i--;
            progressIncrement = (i/3)*100;
            progress.style.width =`${progressIncrement}%`;
            if(i==0){
                progress.innerText = '';
            }
            else{
            progress.innerText = `${i}/3`;
            }
            }
        }
        else{
            const warn = document.getElementById("warning") 
            warn.style.display ="block"
        }
    })
})

inputFields.forEach((input)=>{
    input.value = allGoals[input.id].goal

    input.addEventListener('click',()=>{
        const warn = document.getElementById("warning") 
            warn.style.display ="none"
    } )

    input.addEventListener('input',()=>{
      allGoals[input.id] = {
        goal:input.value,
        status: false
      }
      localStorage.setItem('allGoals',JSON.stringify(allGoals));
    })
})

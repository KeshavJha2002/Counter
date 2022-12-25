function colorChange(counter_mins, counter_hrs) {
    if (counter_mins > 0 || (counter_mins == 0 && counter_hrs > 0))
        document.getElementById("counter-color-mins").style.color = "#00ff00";
    else
        document.getElementById("counter-color-mins").style.color = "#ffffff";

    if (counter_hrs > 0)
        document.getElementById("counter-color-hrs").style.color = "#00ff00";
    else
        document.getElementById("counter-color-hrs").style.color = "#ffffff";

}


const actions = Array.from(document.querySelectorAll('[data-action]'));

let counter_mins = localStorage.getItem('counter-value-mins') || "00";
let counter_hrs = localStorage.getItem('counter-value-hrs') || "00";

colorChange(counter_mins, counter_hrs);

if (counter_mins > 9)
    document.querySelector(".counter-value-mins").innerText = counter_mins;
else
    document.querySelector(".counter-value-mins").innerText = "0" + counter_mins;

if (counter_hrs > 9)
    document.querySelector(".counter-value-hrs").innerText = counter_hrs;
else
    document.querySelector(".counter-value-hrs").innerText = "0" + counter_hrs;

actions.forEach(action => {
    action.addEventListener('click', () => {
        const actionType = action.dataset.action;
        if (actionType === 'increment') {
            counter_mins++;
            if (counter_mins == 60) {
                counter_hrs++;
                counter_mins = 0;
            }
        } else if (actionType === 'decrement') {
            if (counter_mins > 0)
                counter_mins--;
            else if (counter_hrs > 0 && counter_mins == 0) {
                counter_hrs--;
                counter_mins = 59;
            }
        } else if (actionType === 'reset') {
            counter_hrs = 0;
            counter_mins = 0;
        } else if (actionType === 'save') {
            localStorage.setItem('counter-value-hrs', counter_hrs);
            localStorage.setItem('counter-value-mins', counter_mins);
        } else if (actionType === 'load') {
            counter_hrs = localStorage.getItem('counter-value-hrs');
            counter_mins = localStorage.getItem('counter-value-mins');
        } else if (actionType === 'clear') {
            localStorage.clear();
            counter_mins = 0;
            counter_hrs = 0;
        }

        if (counter_mins > 9 || counter_mins == 0)
            document.querySelector(".counter-value-mins").innerText = counter_mins;
        else
            document.querySelector(".counter-value-mins").innerText = "0" + counter_mins;

        if (counter_hrs > 9 || counter_hrs == 0)
            document.querySelector(".counter-value-hrs").innerText = counter_hrs;
        else
            document.querySelector(".counter-value-hrs").innerText = "0" + counter_hrs;

        colorChange(counter_mins, counter_hrs);
    });
});
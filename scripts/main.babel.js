const input = document.getElementById('input'),
      decimalBtn = document.getElementById('decimal'),
      numbers = Array.from(document.querySelectorAll('.number')),
      operations = Array.from(document.querySelectorAll('.operation')),
      clearBtns = Array.from(document.querySelectorAll('.clearBtn'));
let memoryCurrentNumber = 0,
    memoryNewNumber = false,
    memoryPendingOperation = '';

for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    num.addEventListener('click', function (e) {
        pressNum(e.target.textContent);
    });
}

for (let i = 0; i < operations.length; i++) {
    let oprs = operations[i];
    oprs.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
}

for (let i = 0; i < clearBtns.length; i++) {
    let cl = clearBtns[i];
    cl.addEventListener('click', function (e) {
        clear(e.srcElement.id);
    });
}

decimalBtn.addEventListener('click', function (e) {
    decimal(e.target.textContent);
});

function pressNum(number) {
    if (memoryNewNumber) {
        input.value = number;
        memoryNewNumber = false;
    } else {
        if (input.value === '0') {
            input.value = number;
        } else {
            input.value += number;
        }
    }
}

function operation(op) {
    let localOperMemory = input.value;

    if (memoryNewNumber && memoryPendingOperation !== '=') {
        memoryCurrentNumber = input.value;
    } else {
        memoryNewNumber = true;
        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += parseFloat(localOperMemory);
        } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= parseFloat(localOperMemory);
        } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= parseFloat(localOperMemory);
        } else if (memoryPendingOperation === '/') {
            if (parseFloat(localOperMemory) === 0) {
                alert("Jump to Infinity!");
            }
            memoryCurrentNumber /= parseFloat(localOperMemory);
        } else {
            memoryCurrentNumber = parseFloat(localOperMemory);
        }
    }
    input.value = memoryCurrentNumber;
    memoryPendingOperation = op;
}

function clear(id){
    if (id === 'CE') {
        input.value = '0';
        memoryNewNumber = true;
    } else if(id === 'C'){
        input.value = '0';
        memoryCurrentNumber = 0;
        memoryNewNumber = true;
        memoryPendingOperation = '';
    }
}

function decimal() {
    let localDecMemory = input.value;

    if (memoryNewNumber) {
        localDecMemory = '0.';
        memoryNewNumber = false;
    } else {
        if (localDecMemory.indexOf('.') === -1) {
            localDecMemory += '.';
        }
    }
    input.value = localDecMemory;
}

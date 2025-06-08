function toggleScientific() {
            const section = document.getElementById("hidden-buttons");
            section.style.display = section.style.display === "none" ? "flex" : "none";
}


let display = document.getElementById("display");

function appendtodisplay(value) {
    if (display.innerText === '0') {
        display.innerText = value;
    }
    else {
        display.innerText += value;
    }
}

function cleardisplay() {
    display.innerText = "0";
}

function backspace() {
    let text = display.innerText;
    if  (text.length === 1 || text === "Error") {
        display.innerText = "0";
    }
    else {
        display.innerText = text.slice(0, -1);
    }
}

function calculate() {
    let expr = display.innerText;
    expr = expr
        .replace(/÷/g, "/")
        .replace(/x/g, "*")
        .replace(/(\d+)\s*π/g, "$1*Math.PI")
        .replace(/π/g, "Math.PI")
        .replace(/(\d+)\s*e/g, "$1*Math.E")
        .replace(/e/g, "Math.E")
        .replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)")
        .replace(/\^/g, "**");

    expr = expr
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/exp\(/g, "Math.exp(");

    expr = expr.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));

    try {
        let result = eval(expr);
        if (isNaN(result) || result === Infinity || result === -Infinity) throw "Error";
        display.innerText = result;
    } catch {
        display.innerText = "Error";
    }
}

function factorial(n) {
    if (n < 0) return "Error";
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}
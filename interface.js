function setNumUp(id, max, step) {
    var number = Number(document.getElementById(id).innerHTML);
    if (number < max) {
        number += step;
    }
    document.getElementById(id).innerHTML = number;
}
function setNumDown(id, min, step) {
    var number = Number(document.getElementById(id).innerHTML);
    if (number > min) {
        number -= step;
    }
    document.getElementById(id).innerHTML = number;
}
function getDenominator(fraction) {
    if (fraction == "0") {
        return 0;
    }
    else {
        return Number(fraction.split("/")[1]);
    }
}
function setFractionUp(id, payoff) {
    var fraction = document.getElementById(id).innerHTML;
    denominator = getDenominator(fraction);
    if (denominator > 1) {
        denominator /= 2;
        document.getElementById(id).innerHTML = "1/" + denominator;
        if (payoff) {
            updatePayoffMatrix();
        }
    }
    else if (denominator == 0) {
        denominator = 32;
        document.getElementById(id).innerHTML = "1/" + denominator;
        if (payoff) {
            updatePayoffMatrix();
        }
    }
}
function setFractionDown(id, payoff) {
    var fraction = document.getElementById(id).innerHTML;
    denominator = getDenominator(fraction);
    if (denominator < 32 && denominator != 0) {
        denominator *= 2;
        document.getElementById(id).innerHTML = "1/" + denominator;
        if (payoff) {
            updatePayoffMatrix();
        }
    }
    else if (denominator > 0) {
        document.getElementById(id).innerHTML = "0";
        if (payoff) {
            updatePayoffMatrix();
        }
    }
}
function setChanceUp(id, max, step) {
    var fraction = document.getElementById(id).innerHTML;
    denominator = getDenominator(fraction);
    if (denominator == 1) {
        denominator += step - 1;
    }
    else if (denominator < max) {
        denominator += step;
    }
    document.getElementById(id).innerHTML = "1/" + denominator;
}
function setChanceDown(id, min, step) {
    var fraction = document.getElementById(id).innerHTML;
    denominator = getDenominator(fraction);
    if (denominator > min) {
        denominator -= step;
    }
    else {
        denominator = 1;
    }
    document.getElementById(id).innerHTML = "1/" + denominator;
}
function getPayoff(id) {
    denominator = getDenominator(document.getElementById(id).innerHTML)
    if (denominator == 0) {
        return 0
    }
    else {
        return 1 / denominator
    }
}
function updatePayoffMatrix() {
    var CinCC = 8 * getPayoff("CooperatePlayerGains") + 8 * getPayoff("CooperateOpponentGains");
    var CinCD = 8 * getPayoff("CooperatePlayerGains") - 8 * getPayoff("DefectOpponentLoses");
    var DinCD = 8 * getPayoff("DefectPlayerGains") + 8 * getPayoff("CooperateOpponentGains");
    var DinDD = 8 * getPayoff("DefectPlayerGains") - 8 * getPayoff("DefectOpponentLoses");
    document.getElementById("C/C").innerHTML = CinCC + ", " + CinCC;
    document.getElementById("C/D").innerHTML = CinCD + ", " + DinCD;
    document.getElementById("D/C").innerHTML = DinCD + ", " + CinCD;
    document.getElementById("D/D").innerHTML = DinDD + ", " + DinDD;
}
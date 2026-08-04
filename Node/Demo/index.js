function add(a,b)
{
    return a + b;
}
function subtract(a,b)
{
    return a - b;
}

function isEven(n) {
    return n % 2 === 0;
}
function isPositive(a)
{
    if (a>0)
    {
        return true;
    }
    else
        return false;

}

// function studentInfo(a,b,c)
// {
//     return a,b,c;
// }

module.exports = {
    add,
    subtract
    , isEven, isPositive
}


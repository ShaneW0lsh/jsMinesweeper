function create2DArray(x, y) {
    let arr = new Array(x);
    for (let i = 0; i < x; ++i) { 
        arr[i] = new Array(y);
    }
    return arr;
}

function limitValue(val, min, max) { 
    if (val <= min)
        val = min;
    if (val >= max)
        val = max;
    return val;
}

function withinGrid(x, y) { 
    statement = (x <= cols-1 && x >= 0 && y <= rows-1 && y >= 0);
    return statement;
}

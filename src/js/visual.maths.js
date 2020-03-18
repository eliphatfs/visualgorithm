function boundLineWithRect(a, b, c, top, left, bottom, right) {
    if (Math.abs(a) > Math.abs(b)) {
        var gx = function(y) { return (-c - b * y) / a; };
        return [new Victor(gx(top), top), new Victor(gx(bottom), bottom)];
    }
    else {
        var gy = function(x) { return (-c - a * x) / b; };
        return [new Victor(left, gy(left)), new Victor(right, gy(right))];
    }
}

function scalarVictor(scl) { return new Victor(scl, scl); }

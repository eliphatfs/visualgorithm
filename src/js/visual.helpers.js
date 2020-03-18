function tableToObjectList(table) {
    var meta = table[0];
    var result = [];
    for (var i = 1; i < table.length; i++) {
        var obj = {};
        for (var j = 0; j < meta.length; j++) {
            obj[meta[j]] = table[i][j];
        }
        result.push(obj);
    }
    return result;
}

function argMin(arr, func) {
    var minVal = func(arr[0]);
    var minObj = 0;
    for (var i = 1; i < arr.length; i++) {
        var nval = func(arr[i]);
        if (nval < minVal) {
            minVal = nval;
            minObj = i;
        }
    }
    return minObj;
}

function replaceArrayContents(arr, narr) {
    arr.splice(0);
    for (var i = 0; i < narr.length; i++)
        arr.push(narr[i]);
}

function argMax(arr, func) {
    var minVal = func(arr[0]);
    var minObj = 0;
    for (var i = 1; i < arr.length; i++) {
        var nval = func(arr[i]);
        if (nval > minVal) {
            minVal = nval;
            minObj = i;
        }
    }
    return minObj;
}

function filledArray(amount, generator) {
    var arr = [];
    for (var i = 0; i < amount; i++) {
        if (typeof generator === 'function')
            arr.push(generator());
        else
            arr.push(generator);
    }
    return arr;
}

function FSM(func, state) {
    if (state !== null) {
        var result = func(state);
        var newstate = result[0];
        var newdelay = result[1];
        // console.log(result);
        setTimeout(function() { FSM(func, newstate); }, newdelay);
    }
}

function canvasMousePos(canvasElm, evt) {
    var rect = canvasElm.getBoundingClientRect();
    return [
        evt.clientX - rect.left,
        evt.clientY - rect.top
    ];
}

function simpleSlider(sliderElm, dispElm, rangeMin, rangeMax, rangeDefault, updater) {
    noUiSlider.create(sliderElm, {
        start: [rangeDefault],
        connect: true,
        range: {
            'min': [rangeMin],
            'max': [rangeMax]
        }
    });
    sliderElm.noUiSlider.on('update', function (values, handle) {
        dispElm.innerHTML = updater(values[handle]).toFixed(4);
    });
}

function painterActivate(echartInstance, filterByDistance, callback) {
    var down = false;
    var remove = function() { down = false; };
    var addto = function() { down = true; };
    var lastActivated = new Victor(0.0, 0.0);
    var onmove = function(evt) {
        var cmp = canvasMousePos(echartInstance.getDom(), evt);
        var coord = Victor.fromArray(echartInstance.convertFromPixel({xAxisIndex: 0, yAxisIndex: 0}, cmp));
        if (down) {
            if (lastActivated.distance(coord) >= filterByDistance) {
                callback(coord.clone());
                lastActivated = coord;
            }
        }
    };
    var touchmove = function(evt) {
        onmove(evt.touches[0]);
    };
    echartInstance.getDom().addEventListener('mousemove', onmove, false);
    echartInstance.getDom().addEventListener('mouseup', remove, false);
    echartInstance.getDom().addEventListener('mouseout', remove, false);
    echartInstance.getDom().addEventListener('mousedown', addto, false);
    
    echartInstance.getDom().addEventListener('touchmove', touchmove, false);
    echartInstance.getDom().addEventListener('touchend', remove, false);
    echartInstance.getDom().addEventListener('touchcancel', remove, false);
    echartInstance.getDom().addEventListener('touchstart', addto, false);
}

var colorPalette = ['#37A2DA', '#fb7293', '#FFDB5C', '#9FE6B8', '#e7bcf3', '#8378EA', '#96BFFF'];

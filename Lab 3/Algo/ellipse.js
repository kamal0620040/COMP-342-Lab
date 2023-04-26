function DDALine(x1, y1, x2, y2){
    let tempVertices = [];
    let dx = x2 - x1;
    let dy = y2 - y1;

    X = x1;
    Y = y1;

    // TODO: Plot X, Y
    tempVertices.push(X / 600); // 600 * 600 - size of canvas
    tempVertices.push(Y / 600);
    // console.log(X, Y);
    
    let stepsize;
    if(Math.abs(dx) > Math.abs(dy)){
        stepsize = Map.abs(dx);
    }else{
        stepsize = Math.abs(dy);
    }

    let xinc = dx/stepsize;
    let yinc = dy/stepsize;

    let count = 0;
    while(count != stepsize){
        X = X + xinc;
        Y = Y + yinc;
        // TODO: Plot X, Y
        tempVertices.push(X / 600);
        tempVertices.push(Y / 600);
        // console.log(X, Y);
        count++;
    }
    return tempVertices;
}

// DDALine(-100, -100, 100, 100);
//  DDALine(100, 100, -100, -100);
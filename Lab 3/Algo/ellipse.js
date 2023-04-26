function midPointEllipse(rx, ry, xc, yc){
    let tempVertices = [];
    
    let x = 0;
    let y = ry;
    let p = ry * ry - rx * rx * ry + (rx * rx) / 4;
    let dx = 2 * ry * ry * x;
    let dy = 2 * rx * rx * y;

    tempVertices = [...tempVertices,...otherVertice(x, y, xc, yc)];
    
    // Region - 1 
    while(2 * ry * ry * x < 2 * rx * rx * y){
        if(p < 0){
            x = x + 1;
            y = y;
            p = p + 2 * ry * ry * x + ry * ry;
        }else{
            x = x + 1;
            y = y - 1;
            p = p + 2 * ry * ry * x - 2 * rx * rx * y + ry * ry;
        }
        console.log(x,y);
        tempVertices = [...tempVertices,...otherVertice(x, y, xc, yc)];
    }

    p = ry * ry * (x + (1/2)) * (x + (1/2)) + rx * rx * (y - 1) * (y - 1) - rx * rx * ry * ry;
    while(y > 0){
        if(p > 0){
            y = y - 1;
            p = p + rx * rx - 2 * rx * rx * y;
        }else{
            x = x + 1;
            y = y - 1;
            p = p + 2 * ry * ry * x - 2 * rx * rx * y + rx * rx;
        }
        // console.log(x,y);
        tempVertices = [...tempVertices,...otherVertice(x, y, xc, yc)];
    }

    // console.log(tempVertices);
    return tempVertices;
}

function otherVertice(x, y, xc, yc){
    let tempVertices = [];

    tempVertices.push((x+xc)/600);
    tempVertices.push((y+yc)/600);
    tempVertices.push(0);

    tempVertices.push((xc - x)/600);
    tempVertices.push((yc + y)/600);
    tempVertices.push(0);

    tempVertices.push((xc - x)/600);
    tempVertices.push((yc - y)/600);
    tempVertices.push(0);
    
    tempVertices.push((xc + x)/600);
    tempVertices.push((yc - y)/600);
    tempVertices.push(0);

    return tempVertices;
}

// midPointEllipse(10, 8, 0, 0);
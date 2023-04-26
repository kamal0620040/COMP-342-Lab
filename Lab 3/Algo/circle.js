function midPointCircle(radius ,xc, yc){
    let tempVertices = [];
    
    let x = 0;
    let y = radius;

    p = 5/4 - radius;
    while(x < y){
        if(p < 0){
            x = x + 1;
            y = y;
            p = p + 2 * x + 1;
        }else{
            x = x + 1;
            y = y - 1;
            p = p + 2 * x + 1 - 2 * y;
        }
        tempVertices = [...tempVertices,...otherVertex(x, y, xc, yc)];
    }
    // console.log(tempVertices);
    return tempVertices;
}

function otherVertex(x, y, xc, yc){
    let tempVertices = [];

    tempVertices.push((x+xc)/600);
    tempVertices.push((y+yc)/600);
    tempVertices.push(0);
    
    tempVertices.push((y + xc)/600);
    tempVertices.push((x + yc)/600);
    tempVertices.push(0);

    tempVertices.push((xc - x)/600);
    tempVertices.push((yc + y)/600);
    tempVertices.push(0);

    tempVertices.push((xc + y)/600);
    tempVertices.push((yc - x)/600);
    tempVertices.push(0);
    
    tempVertices.push((xc - x)/600);
    tempVertices.push((yc - y)/600);
    tempVertices.push(0);

    tempVertices.push((xc - y)/600);
    tempVertices.push((yc - x)/600);
    tempVertices.push(0);
    
    tempVertices.push((xc - y)/600);
    tempVertices.push((yc + x)/600);
    tempVertices.push(0);

    tempVertices.push((xc + x)/600);
    tempVertices.push((yc - y)/600);
    tempVertices.push(0);

    return tempVertices;
}

// midPointCircle(100, 300, 300);
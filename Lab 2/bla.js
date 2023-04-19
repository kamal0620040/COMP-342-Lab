function BLALine(x1, y1, x2, y2){
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1)
    let slope = dy/dx;
    
    let X, Y, steps, p;
    if(slope < 1){
        X = x1;
        Y = y1;
        // TODO: Plot X, Y
        console.log(X, Y);
        p = 2 * dy - dx;
        steps = x2 - x1;
        for (let i = 0; i < steps; i++){
            if(p < 0){
                p = p + 2 * dy;
            }else{
                Y++;
                p += 2 * dy;
            }
            X++;
            // TODO: Plot X, Y
            console.log(X, Y);
        }
    }else{
        // for slope >= 1
        X = x1;
        Y = y1;
        // TODO: Plot X, Y
        console.log(X, Y);
        steps = y2 - y1;
        p = 2 * dx - dy;
        for(let i = 0; i < steps; i++){
            if(p < 0){
                p = p + 2 * dy;
                p = p + 2 * dx - 2 * dy;
            }else{
                X++;
                p = p + 2 * dx - 2 * dy;
            }
            Y++;
            // TODO: Plot X, Y
            console.log(X, Y);
        }
    }
}

/* Considering my canvas of size 600 * 600 - [-600/600 = -1 ].
** So, point is plotted from (-1,-1) to (1,1) in clipspace
*/
 BLALine(-600, -600, 600, 600);
var rows =10;
var cols = 10;
var grid = Array.from(Array(rows) , () => new Array (cols));
let openset = [];
let closeset = [];
var start;
var end;


//Functions

function creatediv(current)
{
    console.log(current.i , current.j);
    return new Promise((resolve)=>{
        var block = document.createElement('div');
        var celln = current.i * rows + ( current.j + 1);
        block.classList.add('block');
        block.setAttribute('id',celln);
        block.style.gridRowStart = current.i + 1;
        block.style.gridColumnStart = current.j + 1;
        gridc.appendChild(block);
        
        setTimeout(() => {
            resolve();
        }, 100);
    });
    
    
}

function getdiv(current)
{
    return new Promise((resolve)=>
    {
        var celln = current.i * rows + ( current.j + 1);
        var block = document.getElementById(celln);
        block.style.backgroundColor = "red";

        setTimeout(() => {
            resolve();
        }, 100);
    });
}



function removefrom(arr,elt)
{
    for (var i = arr.length-1; i >= 0; i--) {
        if(arr[i] ==elt)
        {
            arr.splice(i,1);
        }
        
    }
}

function heuristics(a,b)
{   
    var tx = a.i - b.i;
    var ty = a.j - b.j;
    var val = Math.pow(tx,2) + Math.pow(ty,2);
    var d = Math.sqrt(val);
    // if(a.i == 0 && a.j == 1)
    // console.log(b.i,b.j,val,tx,ty);
    d = Math.round(d);
    return d;
}

class spot {
    
    constructor(i,j) {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.i = i;
        this.j = j;
        this.neighbor = [];
        
        this.addneighbors = function(grid)
        {   
            var i = this.i;
            var j = this.j;
            
            if(i != rows-1)
            this.neighbor.push(grid[i+1][j]);
            if(i !=0)
            this.neighbor.push(  grid[ i-1 ][ j ]  );
            if(j != cols-1)
            this.neighbor.push(grid[i][j+1]);
            if(j !=0)
            this.neighbor.push(grid[i][j-1]);
        }
        
    }
}

console.log(grid);


//Creating Grid  And Neighbors 
for(var i =0;i<rows;i++)
{
    for(var j=0;j<cols;j++)
    {
        grid[i][j] = new spot(i,j);
    }
}

for(var i =0;i<rows;i++)
{
    for(var j=0;j<cols;j++)
    {
        grid[i][j].addneighbors(grid);
    }
}


start = grid[0][0];
end = grid[rows-1][cols-1];


openset.push(start);


async function main()
{
    
    while(openset.length > 0)
    {
        var winner = 0;
        for(var i =0;i<openset.length;i++)
        {
            if(openset[i].f < openset[winner].f)
            winner = i;
        }
        var current = openset[winner];
        
        //Creating Div
        // console.log(openset);
        // for(var i =0;i<openset.length;i++)
        // {
        await creatediv(current);
        
        
        
        if(current === end)
        {
            console.log("!!!!!DONE");
            console.log(current);
            break;
        }
        
        removefrom(openset ,current);
        closeset.push(current);

        //Making div change to close
        getdiv(current);

        var neighbors = current.neighbor;
        for(var i =0;i<neighbors.length;i++)
        {
            var neighbor = neighbors[i];
            
            if(!closeset.includes(neighbor))
            {
                var tempG = current.g + 1;
                
                if(openset.includes(neighbor))
                {if(tempG < neighbor.g)
                    neighbor.g = tempG;
                }
                else
                {
                    neighbor.g = tempG;
                    openset.push(neighbor);
                }
                
                neighbor.h = heuristics(neighbor,end);
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }
}


window.requestAnimationFrame(main);
var rows =31;
var cols = 50;
var grid = Array.from(Array(rows) , () => new Array (cols));
let openset = [];
let closeset = [];
var start;
var end;
var path = [];
var speed = 0.001;
// speed = speed*100;
var noSolution=true;
//Functions

// function creatediv(current)
// {
//     console.log(current.i , current.j);
//     return new Promise((resolve)=>{
//         var block = document.createElement('div');
//         var celln = current.i * rows + ( current.j + 1);
//         block.classList.add('block');
//         block.setAttribute('id',celln);
//         block.style.gridRowStart = current.i + 1;
//         block.style.gridColumnStart = current.j + 1;
//         gridc.appendChild(block);

//         setTimeout(() => {
//             resolve();
//         }, 100);
//     });


// }

// function getdiv(current)
// {
//     return new Promise((resolve)=>
//     {
//         var celln = current.i * rows + ( current.j + 1);
//         var block = document.getElementById(celln);
//         block.style.backgroundColor = "red";

//         setTimeout(() => {
//             resolve();
//         }, 100);
//     });
// }

function isdiagonal(neighbor,current)
{
    if(neighbor.i == current.i || neighbor.j == current.j )
    return false;
    
    return true;
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
    d = d*10;
    d = Math.floor(d);
    return val;
}

class spot {
    
    constructor(i,j) {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.i = i;
        this.j = j;
        this.neighbor = [];
        this.previous = undefined;
        this.wall = false;
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
            if(i > 0 && j > 0)
            this.neighbor.push(grid[i-1][j-1]);
            if(i > 0 && j < cols-1)
            this.neighbor.push(grid[i-1][j+1]);
            if(i < rows-1 && j > 0)
            this.neighbor.push(grid[i+1][j-1]);
            if(i < rows-1 && j < cols-1)
            this.neighbor.push(grid[i+1][j+1]);
            
        }

        // if(Math.random(1) <0.4)
        // this.wall = true;
        
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

async function main()
{   

    var astar = document.getElementById('A* Search Algorithm').checked;
    var dijsktra = document.getElementById('Dijsktra Search Algorithm').checked;
    if(astar)
    {
        await Astar();
    }
    if(dijsktra)
    {
        await Dijsktra();
    }
}


async function Astar()
{
    start = grid[userstart_i][userstart_j];
    end = grid[userend_i][userend_j];
    start.wall = false;
    end.wall = false;
    
    openset.push(start);
    
    
    while(openset.length > 0)
    {   
        console.log("looping");
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
        //await creatediv(current);
        
        
        
        if(current === end)
        {
            console.log("!!!!!DONE");
            console.log(current);
            var celln = current.i * cols + ( current.j + 1);
            var block = document.getElementById(celln);
            block.style.backgroundColor = "purple";
            console.log(counter);
            noSolution = false;
            break;
        }
        
        removefrom(openset ,current);
        closeset.push(current);
        
        //Making div change to close
        //getdiv(current);
        
        var neighbors = current.neighbor;
        for(var i =0;i<neighbors.length;i++)
        {
            var neighbor = neighbors[i];
            
            if(!closeset.includes(neighbor) && neighbor.wall == false)
            {
                var tempG;
                // if(isdiagonal(neighbor,current))
                // tempG = current.g + 140;
                // else
                tempG = current.g + 1;
                var newPath = false;
                
                if(openset.includes(neighbor))
                {   
                    if(tempG < neighbor.g)
                    {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                }
                else
                {
                    neighbor.g = tempG;
                    newPath = true;
                    openset.push(neighbor);
                    // console.log("working");
                    
                    
                }
                
                if(newPath)
                {
                    neighbor.h = heuristics(neighbor,end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
        var counter = 0;
        path = [];
        var temp = current;
        path.push(temp);
        while(temp.previous)
        {
            path.push(temp.previous);
            temp = temp.previous;
            counter++;
        }
        
        //Openset drawing
        for(var i=0;i<openset.length;i++)
        {
            await draw_openset(openset[i]);
        }
        
        //Closeset Drawing
        for(var i=0;i<closeset.length;i++)
        {
            draw_closeset(closeset[i]);
        }
        
        
        
        // Path Drawing
        for(var i=0;i<path.length;i++)
        {
            var celln = path[i].i * cols + ( path[i].j + 1);
            var block = document.getElementById(celln);
            block.classList.remove('nblock_closeset');
            block.classList.remove('nblock_openset');
            block.style.backgroundColor = "blue";
        }
        
        
    }
    if(noSolution)
    alert("No Solution");
    else
    alert("Solution Found");
    
}



function draw_openset(current)
{
    return new Promise((resolve)=>{
        var celln = current.i * cols + ( current.j + 1);
        var block = document.getElementById(celln);
        block.classList.add('nblock_openset');
        if(block.style.backgroundColor == "lightgreen")
        {
            resolve(); 
            return;
        }
        block.style.backgroundColor = "lightgreen";
        
        setTimeout(() => {
            resolve();
        }, speed);
    });
}



function draw_closeset(current)
{  
    var celln = current.i * cols + ( current.j + 1);
    var block = document.getElementById(celln);
    // block.classList.add('nblock_closeset');
    if(block.style.backgroundColor == "red")
    {   return;}
    block.style.backgroundColor = "red";
    
}

createdefaultdiv();
// main();

function createdefaultdiv()
{   
    
    for(var i = 0;i<rows;i++)
    {
        for(var j=0;j<cols;j++)
        {
            var celln = i * cols + ( j + 1);
            var block = document.createElement('div');
            block.classList.add('block');
            block.setAttribute('id', celln);
            if(grid[i][j].wall == true)
            block.style.backgroundColor = "black";
            block.style.gridRowStart = i + 1;
            block.style.gridColumnStart = j + 1;
            gridc.appendChild(block);
        }
    }
    
    
}
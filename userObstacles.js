let mousedown = false;
var check = 0;
let userstart_i = 0;
let userstart_j = 0;
let userend_i = rows-1;
let userend_j = cols-1;
function displ(e)
{
    var x= e.clientX - gridc.offsetLeft;
    var y= e.clientY - gridc.offsetTop;
    display.innerHTML = x + "," + y;
    // console.log(x ,y);
}
function obstacle()
{
    check = 3;
}
function startlocupdater()
{
    check = 1;
}
function endlocupdater()
{
    check = 2;
}
function startloc(e)
{
    if(check !=1)
    return;

    // console.log(start.i , start.j);
    var prevstartcell = userstart_i*cols + (userstart_j+1); 
    var prevcell = document.getElementById(prevstartcell);
    prevcell.style.backgroundColor = "azure";
    prevcell.classList.remove('nblock');

    var x= e.clientX - gridc.offsetLeft;
    var y= e.clientY - gridc.offsetTop;
    var ccell = Math.floor(x/20) ;
    var rcell = Math.floor(y/20) ;
    var celln = rcell*cols + (ccell + 1);
    var temp = document.getElementById(celln);
    temp.style.backgroundColor = "pink";
    temp.classList.add('nblock');
    userstart_i = rcell;
    userstart_j = ccell;
    //start = grid[rcell][celln];
    // console.log(rcell , ccell);
    // console.log(start.i , start.j);
}


function endloc(e)
{
    if(check !=2)
    return;

    // console.log(start.i , start.j);
    var prevendcell = userend_i*cols + (userend_j+1); 
    var prevcell = document.getElementById(prevendcell);
    prevcell.style.backgroundColor = "azure";
    prevcell.classList.remove('nblock');

    var x= e.clientX - gridc.offsetLeft;
    var y= e.clientY - gridc.offsetTop;
    var ccell = Math.floor(x/20) ;
    var rcell = Math.floor(y/20) ;
    var celln = rcell*cols + (ccell + 1);
    var temp = document.getElementById(celln);
    temp.style.backgroundColor = "yellow";
    temp.classList.add('nblock');
    userend_i = rcell;
    userend_j = ccell;
}

function fill(e)
{
    if(mousedown && check == 3)
    {
        var x= e.clientX - gridc.offsetLeft;
        var y= e.clientY - gridc.offsetTop;
        var ccell = Math.floor(x/20) ;
        var rcell = Math.floor(y/20) ;
        var celln = rcell*cols + (ccell + 1);
        console.log(rcell,ccell);
        var temp = document.getElementById(celln);
        temp.style.backgroundColor = "black";
        grid[rcell][ccell].wall = true;
    }
    //    console.log("hello");
    
}
function updater() {
    mousedown = true;
}
function updater2() {
    mousedown = false;
}

// var gridc = document.getElementById('gridc');
gridc.addEventListener('mousemove',displ);
gridc.addEventListener('mousemove',fill);
gridc.addEventListener("mousedown", updater);
gridc.addEventListener("mousedown", startloc);
gridc.addEventListener("mousedown", endloc);
gridc.addEventListener("mouseup", updater2);


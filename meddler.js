const myCanvas = document.getElementById("canvas");
// Scaling the canvas resolution up:
myCanvas.width = 2134; 
myCanvas.height = 1200;
// Shrinking it down:
myCanvas.style.width = "1067px";
myCanvas.style.height = "600px";
// And bringing it back to the proper size:
myCanvas.getContext("2d").scale(2,2);

// Loading all our images from the html and assigning them to variables:
//const back_scenery_image = document.getElementById("back_scenery"); //we don't have these yet
//const characters_image = document.getElementById("characters");
//const objects_image = document.getElementById("objects");
const test_runner_image = document.getElementById("test_runner");
const ctx = myCanvas.getContext("2d");





// creating an "active dialogue" variable so we can pause instead of reloading the canvas
let dialogue_active = 0; 
// and a dialogue box to click on to move on with the game when it's paused for dialogue...
const dialogue_box = new Path2D();
dialogue_box.rect(30, 450, 1000, 100);



// storing all of our object data
let object_array = [ 
    {
        "name": "Scrying Sphere",
        "render": 1,
        "description1": "Scrying Sphere Line 1: A way to see things in another world...",
        "description2": "Scrying Sphere Line 2: ...one of the most useful tools in my profession.",
        "description3": "Scrying Sphere Line 3",
        "use1": "Use Scrying Sphere Line 1",
        "use2": "Use Scrying Sphere Line 2",
        "use3": "Use Scrying Sphere Line 3",
        "sx": 785,
        "sy": 195,
        "sWidth": 55,
        "sHeight": 50  
    },
    {
        "name": "Bone Hand",
        "render": 1,
        "description1": "Bone Hand Line 1",
        "description2": "Bone Hand Line 2",
        "description3": "Bone Hand Line 3",
        "use1": "Use Bone Hand Line 1",
        "use2": "Use Bone Hand Line 2",
        "use3": "Use Bone Hand Line 3",
        "sx": 800,
        "sy": 285,
        "sWidth": 20,
        "sHeight": 75   
    },
    {
        "name": "Thread",
        "render": 1,
        "description1": "Thread Line 1",
        "description2": "Thread Line 2",
        "description3": "Thread Line 3",
        "use1": "Use Thread Line 1",
        "use2": "Use Thread Line 2",
        "use3": "Use Thread Line 3",
        "sx": 975,
        "sy": 190,
        "sWidth": 40,
        "sHeight": 30
    }
]

// defining all our objects as Paths by hand. This is atrociously inefficient, but I just need it to work for now.
const object0 = new Path2D(); // scrying sphere
object0.rect(object_array[0].sx * 2/3, object_array[0].sy * 2/3, object_array[0].sWidth * 2/3, object_array[0].sHeight * 2/3); 

const object1 = new Path2D(); // bone hand
object1.rect(object_array[1].sx * 2/3, object_array[1].sy * 2/3, object_array[1].sWidth * 2/3, object_array[1].sHeight * 2/3); 

const object2 = new Path2D(); // thread
object2.rect(object_array[2].sx * 2/3, object_array[2].sy * 2/3, object_array[2].sWidth * 2/3, object_array[2].sHeight * 2/3); 





//I want a small delay on running this script...
setTimeout(function() {
    drawCanvas();
    document.getElementById("loading_paragraph").innerHTML = ""; //deleting the loading text lmao
}, 500);




// the main drawing function, printing the background, the characters, and the objects. 
function drawCanvas() {
    const dialogue_active = 0;
    if (canvas.getContext) {
//        const ctx = myCanvas.getContext("2d");
        
        
        ctx.fillStyle = "rgb(200, 0, 0)"; 
        ctx.fillRect(10, 10, 50, 50); // a relic rectangle
        ctx.font = "18px serif";
        ctx.drawImage(test_runner_image, 0, 0, 292, 345, 10, 100, 292, 345);
//        ctx.drawImage(back_scenery_image, 0, 0, 1600, 900, 0, 0, 1067, 600); // put these back when we have them!
//        ctx.drawImage(characters_image, 0, 0, 1600, 900, 0, 0, 1067, 600); // this too
        ctx.fill(object0); //just for testing, we draw the rectangles. 
        ctx.fill(object1);
        ctx.fill(object2);
        object_array.forEach(function(element) {
            if (element.render == 1) {
                ctx.drawImage(objects_image, element.sx, element.sy, element.sWidth, element.sHeight, element.sx * 2/3, element.sy * 2/3, element.sWidth * 2/3, element.sHeight * 2/3);
            }  
        });        
    }
}

function hoverTextFormat() {
        ctx.fillStyle = "rgba(253, 248, 221, 1)";
        ctx.fillRect(30, 450, 1000, 100);
        ctx.fillStyle = "rgba(10,10,10,255)";
        ctx.font = "18px serif";
}


// listen for mouse moves. Horrifically inefficient, but functional. 
myCanvas.addEventListener("mousemove", function(event) {
    if (ctx.isPointInPath(object0, event.offsetX * 2, event.offsetY * 2) && object_array[0].render == 1 && dialogue_active == 0) {
        hoverTextFormat();
        ctx.fillText(object_array[0].description1, 50, 480);
        ctx.fillText(object_array[0].description2, 50, 505);
        ctx.fillText(object_array[0].description3, 50, 530);
        document.getElementById("demo").innerHTML += dialogue_active;
    }
    else if (ctx.isPointInPath(object1, event.offsetX * 2, event.offsetY * 2) && object_array[1].render == 1 && dialogue_active == 0) {
        hoverTextFormat();
        ctx.fillText(object_array[1].description1, 50, 480);
        ctx.fillText(object_array[1].description2, 50, 505);
        ctx.fillText(object_array[1].description3, 50, 530);
    }
    else if (ctx.isPointInPath(object2, event.offsetX * 2, event.offsetY * 2) && object_array[2].render == 1 && dialogue_active == 0) {
        hoverTextFormat();
        ctx.fillText(object_array[2].description1, 50, 480);
        ctx.fillText(object_array[2].description2, 50, 505);
        ctx.fillText(object_array[2].description3, 50, 530);
    }
    else if (dialogue_active == 0) {
        drawCanvas();
    }
});


// listen for mouse clicks, constructed like the above event listener.
myCanvas.addEventListener("click", function(event) {
    if (ctx.isPointInPath(object0, event.offsetX * 2, event.offsetY * 2) && object_array[0].render == 1) {
        hoverTextFormat();
        ctx.fillText(object_array[0].use1, 50, 480);
        ctx.fillText(object_array[0].use2, 50, 505);
        ctx.fillText(object_array[0].use3, 50, 530);
        object_array[0].render = 0;
        document.getElementById("demo").innerHTML += dialogue_active;
        dialogue_active = 1;
    }
    else if (ctx.isPointInPath(object1, event.offsetX * 2, event.offsetY * 2) && object_array[1].render == 1) {
        hoverTextFormat();
        ctx.fillText(object_array[1].use1, 50, 480);
        ctx.fillText(object_array[1].use2, 50, 505);
        ctx.fillText(object_array[1].use3, 50, 530);
        document.getElementById("demo").innerHTML += dialogue_active;
        object_array[1].render = 0;
        dialogue_active = 1;
    }
    else if (ctx.isPointInPath(object2, event.offsetX * 2, event.offsetY * 2) && object_array[2].render == 1) {
        hoverTextFormat();
        ctx.fillText(object_array[2].use1, 50, 480);
        ctx.fillText(object_array[2].use2, 50, 505);
        ctx.fillText(object_array[2].use3, 50, 530);
        document.getElementById("demo").innerHTML += dialogue_active;
        object_array[2].render = 0;
        dialogue_active = 1;
    }
    else if (ctx.isPointInPath(dialogue_box, event.offsetX * 2, event.offsetY * 2) && dialogue_active == 1) {
        dialogue_active = 0;
        document.getElementById("demo").innerHTML += dialogue_active;
        drawCanvas();
     }
});

document.getElementById("demo").innerHTML += dialogue_active;





















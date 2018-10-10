# Snake in pure javascript!

This is a guide step by step on how I tried to make the game work (there will always be a better way to do that).
Try the [Demo](http://codepen.io/isky/full/mmGVXO/) on codepen.io. 
Start creating a canvas on index.html file and import snake.js file.

```sh
<html>
<head>
    <title>Snake</title>
    <style>canvas { background: #000; display: block; margin: 0 auto; }</style>
</head>
<body>
    <canvas id="snake" width="480" height="320"></canvas>
</body>
<script src="./snake.js"></script>
</html>
```

Canvas is an html element used to draw graphic.
Now in order to write on canvas we need to grab it on our snake.js application and create a ctx variable to store 2D rendering context.

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
```

The first step, now, is drawing two squares, the initial snake and the food.
We want to position the snake square in the middle of x axis at the bottom, and the food ina a randomly place on the canvas.
So we create two function drawSnake() and drawFood().

Draw snake : 

```sh
var x = canvas.width/2;
var y = canvas.height-30;
var snakeHeight = 10;
var snakeWidth = 10;
```

x and y are the actual position of the snake on the canvas, snakeHeight and snakeWidth represent the dimension of the square.

```sh
function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
```

All instructions are inside beingPath() and closePath();
Then we define our rectangle (10x10, so a square) at the bottom, in the middle of x axis and, after that, we define a colour (white)

Now we want to draw the food.

```sh
var foodHeight = 10;
var foodWidth = 10;
var foodX = Math.floor(Math.random() * canvas.width) + 1;
var foodY = Math.floor(Math.random() * canvas.height) + 1;
```
We define an height and a width, and then a random position on x and y axis. After that we do the same we did for drawSnake.

```sh
function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, foodWidth, foodHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
```

Let’s put everything together in snake.js

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var snakeHeight = 10;
var snakeWidth = 10;
var foodHeight = 10;
var foodWidth = 10;
var foodX = Math.floor(Math.random() * canvas.width) + 1;
var foodY = Math.floor(Math.random() * canvas.height) + 1;
function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, foodWidth, foodHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

drawSnake();
drawFood();
```

Now we have a square that is the initial snake and our food, every time we refresh our page the food changes his position (as we wanted)

```sh
Math.floor(Math.random() * canvas.width) + 1;
```

With this function we get a random number between the start and the end of the x axis (width of the canvas) and we did the same for the y axis (height).
Sometimes parst of food can be outside of our canvas, that happens because we set at max x and y of food respectively to height and width, so let’s subtract the dimension of our food from the max x and y.

```sh
Math.floor(Math.random() * canvas.width - foodWidth) + 1;
Math.floor(Math.random() * canvas.height - foodHeight) + 1;
```

In the next step we want our snake to move, so we can call our drawSnake() function every x milliseconds and change the value of x and y (so it will be re-draw in a different position).
So we create a draw() function that will be called every 10 milliseconds and draws the snake and the food.

```sh
function draw() {
    drawSnake();
    drawFood();
    x--;
}

var interval = setInterval(draw, 10);
```

If you update your page you’ll see that our snake will move left (x axis) but the previous square is never deleted. So we have to put at the start of draw() function in order to clear the canvas at the start of every iteration:

```sh
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

Now we have our snake moving on the left but when he arrives at the x axis’ end, the snake will disappear, we will think about it later, now let’s try to move our snake using our keyboard.
We need to create an event that call a function when one key is pressed, then we check if it is right/left/up/down arrow and change the direction of the snake.

```sh
document.addEventListener("keydown", keyDownHandler, false);
```

This call the function keyDownHandler when a key is pressed, so now we define the keyDownHandler function.

```sh
function keyDownHandler(e) {
    if(e.keyCode == 37) {
    //left
    } 
    else if(e.keyCode == 38) {
    //up
    } 
    else if(e.keyCode == 39) {
        //rigth
    } 
    else if(e.keyCode == 40) {
        //down
    }
}
```

Now with e.keyCode we know which key the user press (37 is left arrow and so on..).
So we can decide the direction of our snake.
We can move it on the x axis or on the y axis.
So we create a variable “direction” where we store the directions of our snake (up, down, left, right), by default we set it up to 1 and we assume that 1 = up, 2 = down, 3 = left, 4 = right.

```sh
var direction = 1;
function keyDownHandler(e) {
    if(e.keyCode == 37) {
    direction = 3;
    } 
    else if(e.keyCode == 38) {
    direction = 1;
    } 
    else if(e.keyCode == 39) {
        direction = 4;
    } 
    else if(e.keyCode == 40) {
        direction = 2;
    }
}
```

Now we can create a function checkDirection() that we call at the start of our draw() function and change the value of x and y axis if the direction has changed.

```sh
function checkDirection() {
    if(direction == 1) {
        y--;
    }
    else if(direction == 2) {
        y++;
    } 
    else if(direction == 3) {
        x--;
    }
    else if(direction == 4) {
        x++;
    }
}
```

So let’s put everything together and try to see what happens.

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var snakeHeight = 10;
var snakeWidth = 10;
var foodHeight = 10;
var foodWidth = 10;
var foodX = Math.floor(Math.random() * canvas.width - foodWidth) + 1;
var foodY = Math.floor(Math.random() * canvas.height - foodHeight) + 1;
var direction = 1;

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        direction = 3;
    } 
    else if(e.keyCode == 38) {
        direction = 1;
    } 
    else if(e.keyCode == 39) {
        direction = 4;
    } 
    else if(e.keyCode == 40) {
        direction = 2;
    }
}

function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, foodWidth, foodHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    checkDirection();
}

function checkDirection() {
    if(direction == 1) {
        y--;
    }
    else if(direction == 2) {
        y++;
    } 
    else if(direction == 3) {
        x--;
    }
    else if(direction == 4) {
        x++;
    }
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 10);
```

At the start our snake will move up (we set by default the direction to 1, if you change it the snake will move in every direction you want!) and we can control the snake using our keyboard, but we still have a big problem. If we go out of the canvas the snake disappears and we don’t want this happening in our game, but we want that the user to lose and the game to restart.
So we need to check for the collision with the border of the canvas. Let’s do it!

We define a function checkCollision() that we call at every draw() function.

```sh
function checkCollision() {
    if(y > canvas.height || y < 0 || x < 0 || x > canvas.width) {
        //collision detect
    }
}
```

What we’re going to do is pretty simple. We check if the y axis of the snake is > of the height of the canvas or < of 0 (the start of the canvas) and we do the same for the x axis with the width of the canvas. Pretty simple!

Now we want to restart the game if we detect a collision, so define a restart function()

```sh
function restart() {
    x = canvas.width/2;
    y = canvas.height-30;
    direction = 1;
}
```

This simply reset the position of the snake at the middle of x axis at the bottom, and reset the direction to up. So, when we lose, the game restarts again.
Put everything together and try it!

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var snakeHeight = 10;
var snakeWidth = 10;
var foodHeight = 10;
var foodWidth = 10;
var foodX = Math.floor(Math.random() * canvas.width - foodWidth) + 1;
var foodY = Math.floor(Math.random() * canvas.height - foodHeight) + 1;
var direction = 1;

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        direction = 3;
    } 
    else if(e.keyCode == 38) {
        direction = 1;
    } 
    else if(e.keyCode == 39) {
        direction = 4;
    } 
    else if(e.keyCode == 40) {
        direction = 2;
    }
}

function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, foodWidth, foodHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    checkCollision();
    checkDirection();
}

function checkDirection() {
    if(direction == 1) {
        y--;
    }
    else if(direction == 2) {
        y++;
    } 
    else if(direction == 3) {
        x--;
    }
    else if(direction == 4) {
        x++;
    }
}

function checkCollision() {
    if(y > canvas.height || y < 0 || x < 0 || x > canvas.width) {
        restart();
    }
}

function restart() {
    x = canvas.width/2;
    y = canvas.height-30;
    direction = 1;
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 10);
```

As you can see if our snake goes on the food nothing happens, this is bad and it will make our game really boring, but hey, step by step we will solve everything!
So we want that when the snake is on the food we detect a collision and then do something.
We define a checkCollisionWithFood() function that detects if we have a collision with the food in the same way we did for the collision with the border of the canvas.

```sh
var precision = 5;
function checkCollisionWithFood() {
if((x - precision < foodX  && foodX < x + precision) && (y - precision < foodY && foodY < y + precision)) {
        //collision detect
    }
}
```

We define a precision variable, higher the precision simpler the collision, we can’t define that we have the same x and y axis doing something like:

```sh
if(x == foodX && y == foodY )
```

No one will get the food!
So try to increment and decrement the precision variable and see what happens!

Now we have the collision, so our first step is “okay, the snake take the food, so create a new food in a new position”.

So we implement our checkCollisionWithFood function : 

```sh
function checkCollisionWithFood() {
    if((x - precision < foodX  && foodX < x + precision) && (y - precision < foodY && foodY < y + precision)) {
        foodX = Math.floor(Math.random() * canvas.width) + 1;
        foodY = Math.floor(Math.random() * canvas.height) + 1;
    }
}
```

Let’s put everything together and see what happens!

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var snakeHeight = 10;
var snakeWidth = 10;
var foodHeight = 10;
var foodWidth = 10;
var foodX = Math.floor(Math.random() * canvas.width - foodWidth) + 1;
var foodY = Math.floor(Math.random() * canvas.height - foodHeight) + 1;
var direction = 1;
var precision = 5;

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        direction = 3;
    } 
    else if(e.keyCode == 38) {
        direction = 1;
    } 
    else if(e.keyCode == 39) {
        direction = 4;
    } 
    else if(e.keyCode == 40) {
        direction = 2;
    }
}

function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, foodWidth, foodHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    checkCollision();
    checkCollisionWithFood();
    checkDirection();
}

function checkDirection() {
    if(direction == 1) {
        y--;
    }
    else if(direction == 2) {
        y++;
    } 
    else if(direction == 3) {
        x--;
    }
    else if(direction == 4) {
        x++;
    }
}

function checkCollision() {
    if(y > canvas.height || y < 0 || x < 0 || x > canvas.width) {
        restart();
    }
}

function checkCollisionWithFood() {
    if((x - precision < foodX  && foodX < x + precision) && (y - precision < foodY && foodY < y + precision)) {
        foodX = Math.floor(Math.random() * canvas.width) + 1;
        foodY = Math.floor(Math.random() * canvas.height) + 1;
    }
}

function restart() {
    x = canvas.width/2;
    y = canvas.height-30;
    direction = 1;
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 10);
```

Now we can take the food and we lose if we go out of the canvas.
Our next step is to create a score function where we save how much food we eat and display it on the canvas. So we define a drawScore() function.

```sh
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#b6b3b3";
    ctx.fillText("Score: "+score, 8, 20);
}
```

Then we increment our score in checkCollisionWithFood() and we set score to 0 in the restart function. Put everything together. Now we can play and interact with the game!!

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var snakeHeight = 10;
var snakeWidth = 10;
var foodHeight = 10;
var foodWidth = 10;
var foodX = Math.floor(Math.random() * canvas.width - foodWidth) + 1;
var foodY = Math.floor(Math.random() * canvas.height - foodHeight) + 1;
var score = 0;
var direction = 1;
var precision = 5;

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        direction = 3;
    } 
    else if(e.keyCode == 38) {
        direction = 1;
    } 
    else if(e.keyCode == 39) {
        direction = 4;
    } 
    else if(e.keyCode == 40) {
        direction = 2;
    }
}

function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, foodWidth, foodHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#b6b3b3";
    ctx.fillText("Score: "+score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
    checkCollision();
    checkCollisionWithFood();
    checkDirection();
}

function checkDirection() {
    if(direction == 1) {
        y--;
    }
    else if(direction == 2) {
        y++;
    } 
    else if(direction == 3) {
        x--;
    }
    else if(direction == 4) {
        x++;
    }
}

function checkCollision() {
    if(y > canvas.height || y < 0 || x < 0 || x > canvas.width) {
        restart();
    }
}

function checkCollisionWithFood() {
    if((x - precision < foodX  && foodX < x + precision) && (y - precision < foodY && foodY < y + precision)) {
        foodX = Math.floor(Math.random() * canvas.width) + 1;
        foodY = Math.floor(Math.random() * canvas.height) + 1;
        score++;
    }
}

function restart() {
    x = canvas.width/2;
    y = canvas.height-30;
    direction = 1;
    score = 0;
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 10);
```

You can now have fun, but this game is not snake! Our snake will never get bigger :(

So let’s forget what we did before and try to get a snake made by a lot of squares, so we can create an array with all part of the snake in it, we can use a structure like
[ { x: 10, y: 10 } ]
So in this case we have a snake made by just one square at position 10:10.
Update your code in order to have a new snake structure.

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var snake = [ {x: canvas.width/2, y: canvas.height-30} ]
var snakeHeight = 10;
var snakeWidth = 10;

function drawSnake(element) {
    ctx.beginPath();
    ctx.rect(element.x, element.y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(function(element){
        drawSnake(element)
    })
}

draw();
```

If you add a new square in the snake structure you’ll see that the new square will be displayed, so try to change the structure

```sh
var snake = [ {x: canvas.width/2, y: canvas.height-30}, {x: canvas.width/2 - 10, y: canvas.height-30} ]
```

Well now turn back to the first simple structure and try to move the snake (with just one square, we’ll think about other pieces later).
So we need to call the checkDirection() function inside snake.forEach() loop (and re-add the keyDownHandler function and the document event on keyboard push).
Let’s do that.

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var snake = [ {x: canvas.width/2, y: canvas.height-30} ]
var snakeHeight = 10;
var snakeWidth = 10;
var direction = 1;

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        direction = 3;
    } 
    else if(e.keyCode == 38) {
        direction = 1;
    } 
    else if(e.keyCode == 39) {
        direction = 4;
    } 
    else if(e.keyCode == 40) {
        direction = 2;
    }
}

function drawSnake(element) {
    ctx.beginPath();
    ctx.rect(element.x, element.y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(function(element){
        checkDirection(element);
        drawSnake(element);
    })
}

function checkDirection(element) {
    if(direction == 1) {
        element.y--;
    }
    else if(direction == 2) {
        element.y++;
    } 
    else if(direction == 3) {
        element.x--;
    }
    else if(direction == 4) {
        element.x++;
    }
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 10);
```

Now we can move our snake with the new structure (that allow us to make our snake bigger when he eat).
But if we now try to add a new element in the snake structure.

```sh
var snake = [ {x: canvas.width/2, y: canvas.height-30}, {x: canvas.width/2, y: canvas.height-40} ]
```

Well all pieces moves, but hey, not in the way we want!
So we want to change the direction of the snake once at time and so we need to save the direction of each piece, our structure could the following:

```sh
var snake = [ {x: canvas.width/2, y: canvas.height-30, direction: 1} ]
```

So when we press a key we want that only the first piece of our snake change the direction and step by step all the next pieces change direction according with the previous ones. So let’s change a little bit our code.

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var snake = [ {x: canvas.width/2, y: canvas.height-30, direction: 1} ]
var snakeHeight = 10;
var snakeWidth = 10;

function keyDownHandler(e) {
    if(e.keyCode == 37) {
    snake[0].direction =  3;
    } 
    else if(e.keyCode == 38) {
    snake[0].direction = 1;
    } 
    else if(e.keyCode == 39) {
        snake[0].direction = 4;
    } 
    else if(e.keyCode == 40) {
        snake[0].direction = 2;
    }
}

function drawSnake(element) {
    ctx.beginPath();
    ctx.rect(element.x, element.y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(function(element){
        checkDirection(element);
        drawSnake(element);
    })
}

function checkDirection(element) {
    if(element.direction == 1) {
        element.y--;
    }
    else if(element.direction == 2) {
        element.y++;
    } 
    else if(element.direction == 3) {
        element.x--;
    }
    else if(element.direction == 4) {
        element.x++;
    }
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 10);
```

If now you add a new piece to the snake you can see that only one piece change direction as we want, that’s because we only change the element direction to the first piece in the snake array.

```sh
var snake = [ {x: canvas.width/2, y: canvas.height-30, direction: 1}, {x: canvas.width/2, y: canvas.height-40, direction: 1} ]
```

Now we want that the other pieces change the direction based on the previous ones.
First of all we need to change the checkDirection() function and move the snake pieces from the exact height (or width). So…

```sh
function checkDirection(element) {
    if(element.direction == 1) {
        element.y -= snakeWidth;
    }
    else if(element.direction == 2) {
        element.y += snakeWidth;
    } 
    else if(element.direction == 3) {
        element.x -= snakeHeight;
    }
    else if(element.direction == 4) {
        element.x += snakeHeight;
    }
}
```

Now the snake will move the exact dimension of his height/width, and that’s what we need.
The next step is change how we change the direction, so in our draw function after we loop for the snake in order to move it we need to change the direction of all the others pieces based on the previous one. We need to start from the last element and change it so, let’s write a function changeDirection.

```sh
function changeDirection(element, index) {
    if(index != 0) {
        var previousElement = snake[index - 1];
        element.direction = previousElement.direction;
    }
}
```

We don’t need to change the direction of the first piece of the snake because we change it using the keyHandler function.
Now we need in the draw function to loop again all the snake but starting from the last piece and pass it to changeDirection function.
Let’s do it.

```sh
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(function(element, index){
        checkDirection(element);
        drawSnake(element);
    })
    for(var i = snake.length - 1; i >= 0; i--) {
        changeDirection(snake[i], i);
    }
}
```

Let’s put everything together using a snake made by 3 pieces and try it!

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var snake = [ {x: canvas.width/2, y: canvas.height-30, direction: 1}, {x: canvas.width/2, y: canvas.height-20, direction: 1}, {x: canvas.width/2, y: canvas.height-10, direction: 1} ]
var snakeHeight = 10;
var snakeWidth = 10;

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        snake[0].direction =  3;
    } 
    else if(e.keyCode == 38) {
        snake[0].direction = 1;
    } 
    else if(e.keyCode == 39) {
        snake[0].direction = 4;
    } 
    else if(e.keyCode == 40) {
        snake[0].direction = 2;
    }
}

function drawSnake(element) {
    ctx.beginPath();
    ctx.rect(element.x, element.y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(function(element, index){
        checkDirection(element);
        drawSnake(element);
    })
    for(var i = snake.length - 1; i >= 0; i--) {
        changeDirection(snake[i], i);
    }
}

function checkDirection(element) {
    if(element.direction == 1) {
        element.y -= snakeWidth;
    }
    else if(element.direction == 2) {
        element.y += snakeWidth;
    } 
    else if(element.direction == 3) {
        element.x -= snakeHeight;
    }
    else if(element.direction == 4) {
        element.x += snakeHeight;
    }
}

function changeDirection(element, index) {
    if(index != 0) {
        var previousElement = snake[index - 1];
        element.direction = previousElement.direction;
    }
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 100);
```

Our next step is re-insert the random draw and all the collision in our code in order to check if the head of the snake has a collision (ONLY THE HEAD!).

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var snake = [ {x: canvas.width/2, y: canvas.height-30, direction: 1}, {x: canvas.width/2, y: canvas.height-20, direction: 1}, {x: canvas.width/2, y: canvas.height-10, direction: 1} ]
var snakeHeight = 10;
var snakeWidth = 10;
var foodHeight = 10;
var foodWidth = 10;
var foodX = Math.floor(Math.random() * canvas.width - foodWidth) + 1;
var foodY = Math.floor(Math.random() * canvas.height - foodHeight) + 1;
var score = 0;
var precision = 5;

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        snake[0].direction =  3;
    } 
    else if(e.keyCode == 38) {
        snake[0].direction = 1;
    } 
    else if(e.keyCode == 39) {
        snake[0].direction = 4;
    } 
    else if(e.keyCode == 40) {
        snake[0].direction = 2;
    }
}

function drawSnake(element) {
    ctx.beginPath();
    ctx.rect(element.x, element.y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, foodWidth, foodHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#b6b3b3";
    ctx.fillText("Score: "+score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(function(element, index){
        checkDirection(element);
        drawSnake(element);
    })
    checkCollision();
    checkCollisionWithFood();
    drawFood();
    drawScore();
    for(var i = snake.length - 1; i >= 0; i--) {
        changeDirection(snake[i], i);
    }
}

function checkDirection(element) {
    if(element.direction == 1) {
        element.y -= snakeWidth;
    }
    else if(element.direction == 2) {
        element.y += snakeWidth;
    } 
    else if(element.direction == 3) {
        element.x -= snakeHeight;
    }
    else if(element.direction == 4) {
        element.x += snakeHeight;
    }
}

function changeDirection(element, index) {
    if(index != 0) {
        var previousElement = snake[index - 1];
        element.direction = previousElement.direction;
    }
}

function checkCollision() {
    if(snake[0].y > canvas.height || snake[0].y < 0 || snake[0].x < 0 || snake[0].x > canvas.width) {
        restart();
    }
}

function checkCollisionWithFood() {
    if((snake[0].x - precision < foodX  && foodX < snake[0].x + precision) && (snake[0].y - precision < foodY && foodY < snake[0].y + precision)) {
        foodX = Math.floor(Math.random() * canvas.width - 5) + 1;
        foodY = Math.floor(Math.random() * canvas.height - 5) + 1;
        score++;
    }
}

function restart() {
    snake = [{x: canvas.width/2, y: canvas.height-30, direction: 1}];
    foodX = Math.floor(Math.random() * canvas.width - foodWidth) + 1;
    foodY = Math.floor(Math.random() * canvas.height - foodHeight) + 1;
    score = 0;
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 100);
```

Now we have our snake and the score when we eat the food, we have the collision detection but we don’t still get bigger if we eat.
So let’s do it, simply when we eat we push a new element on the snake array in the right position with the correct direction!
Let’s do it!!!!

```sh
function checkCollisionWithFood() {
    if((snake[0].x - precision < foodX  && foodX < snake[0].x + precision) && (snake[0].y - precision < foodY && foodY < snake[0].y + precision)) {
        foodX = Math.floor(Math.random() * canvas.width - 5) + 1;
        foodY = Math.floor(Math.random() * canvas.height - 5) + 1;
        var lastElement = snake[snake.length - 1];
        switch(lastElement.direction) {
            case 1:
                snake.push({x: lastElement.x, y: lastElement.y + snakeHeight, direction: lastElement.direction});
                break;
            case 2:
                snake.push({x: lastElement.x, y: lastElement.y - snakeHeight, direction: lastElement.direction});
                break;
            case 3:
                snake.push({x: lastElement.x + snakeWidth, y: lastElement.y, direction: lastElement.direction});
                break;
            case 4:
                snake.push({x: lastElement.x - snakeWidth, y: lastElement.y, direction: lastElement.direction});
                break;
        }
        score++;
    }
}
```

We check in switch/case statement the direction of the last element in order to add the pieces in the correct position!
That’s it! Now you can play !

But wait, we have 2 problems! (problems everywhere).
If our snake is going right we can’t go left ! But in our game we can! That’s not good. The other problem is checking the collision with the snake self.
But start from the first problem.

So let’s simply create new function canChangeDirection and check if he can change direction.
For example if the actual direction is 1 (up) he can’t switch if the new direction is 2.

```sh
function canChangeDirection(newDirection) {
    if(newDirection === false) {
        return false;
    }

    if((newDirection == 1 && snake[0].direction != 2) || (newDirection == 2 && snake[0].direction != 1) || (newDirection == 3 && snake[0].direction != 4) || (newDirection == 4 && snake[0].direction != 3)) {
        return true;
    }

    return false;
}
```

And then change the keyHandler function:

```sh
function keyDownHandler(e) {
    var newDirection = false;
    if(e.keyCode == 37) {
        newDirection = 3;
    } 
    else if(e.keyCode == 38) {
        newDirection = 1;
    } 
    else if(e.keyCode == 39) {
        newDirection = 4;
    } 
    else if(e.keyCode == 40) {
        newDirection = 2;
    }
    if(canChangeDirection(newDirection)) {
        snake[0].direction = newDirection;
    }
}
```

Pretty simple!

Now we just need to check if the snake collide with itself. Add new function checkCollisionWithItself and check if the position of the head of the snake is the same of the position of another piece.

```sh
function checkCollisionWithItself() {
    var x = snake[0].x;
    var y = snake[0].y;
    var collision = false;

    snake.forEach(function(element, index){
        if(index != 0) {
            
        }
    })

    if(collision) {
        restart();
    }
}
```

Now we need to define the condition when the snake is touching itself.
We can check the element.x and the actual x. Let’s try this.

```sh
function checkCollisionWithItself() {
    var x = snake[0].x;
    var y = snake[0].y;
    var collision = false;

    snake.forEach(function(element, index){
        if(index != 0) {
            if(element.x == x && element.y == y) {
                collision = true;
            }
        }
    })

    if(collision) {
        restart();
    }
}
```

Well it works!
This is our final code 

```sh
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var snake = [ {x: canvas.width/2, y: canvas.height-30, direction: 1}, {x: canvas.width/2, y: canvas.height-20, direction: 1}, {x: canvas.width/2, y: canvas.height-10, direction: 1} ]
var snakeHeight = 10;
var snakeWidth = 10;
var foodHeight = 10;
var foodWidth = 10;
var foodX = Math.floor(Math.random() * canvas.width - foodWidth) + 1;
var foodY = Math.floor(Math.random() * canvas.height - foodHeight) + 1;
var score = 0;
var precision = 10;

function keyDownHandler(e) {
    var newDirection = false;
    if(e.keyCode == 37) {
        newDirection = 3;
    } 
    else if(e.keyCode == 38) {
        newDirection = 1;
    } 
    else if(e.keyCode == 39) {
        newDirection = 4;
    } 
    else if(e.keyCode == 40) {
        newDirection = 2;
    }
    if(canChangeDirection(newDirection)) {
        snake[0].direction = newDirection;
    }
}

function drawSnake(element) {
    ctx.beginPath();
    ctx.rect(element.x, element.y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, foodWidth, foodHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#b6b3b3";
    ctx.fillText("Score: "+score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(function(element, index){
        checkDirection(element);
        drawSnake(element);
    })
    checkCollision();
    checkCollisionWithFood();
    checkCollisionWithItself();
    drawFood();
    drawScore();
    for(var i = snake.length - 1; i >= 0; i--) {
        changeDirection(snake[i], i);
    }
}

function checkDirection(element) {
    if(element.direction == 1) {
        element.y -= snakeWidth;
    }
    else if(element.direction == 2) {
        element.y += snakeWidth;
    } 
    else if(element.direction == 3) {
        element.x -= snakeHeight;
    }
    else if(element.direction == 4) {
        element.x += snakeHeight;
    }
}

function changeDirection(element, index) {
    if(index != 0) {
        var previousElement = snake[index - 1];
        element.direction = previousElement.direction;
    }
}

function canChangeDirection(newDirection) {
    if(newDirection === false) {
        return false;
    }

    if((newDirection == 1 && snake[0].direction != 2) || (newDirection == 2 && snake[0].direction != 1) || (newDirection == 3 && snake[0].direction != 4) || (newDirection == 4 && snake[0].direction != 3)) {
        return true;
    }

    return false;
}

function checkCollision() {
    if(snake[0].y > canvas.height || snake[0].y < 0 || snake[0].x < 0 || snake[0].x > canvas.width) {
        restart();
    }
}

function checkCollisionWithFood() {
    if((snake[0].x - precision < foodX  && foodX < snake[0].x + precision) && (snake[0].y - precision < foodY && foodY < snake[0].y + precision)) {
        foodX = Math.floor(Math.random() * canvas.width - 5) + 1;
        foodY = Math.floor(Math.random() * canvas.height - 5) + 1;
        var lastElement = snake[snake.length - 1];
        switch(lastElement.direction) {
            case 1:
                snake.push({x: lastElement.x, y: lastElement.y + snakeHeight, direction: lastElement.direction});
                break;
            case 2:
                snake.push({x: lastElement.x, y: lastElement.y - snakeHeight, direction: lastElement.direction});
                break;
            case 3:
                snake.push({x: lastElement.x + snakeWidth, y: lastElement.y, direction: lastElement.direction});
                break;
            case 4:
                snake.push({x: lastElement.x - snakeWidth, y: lastElement.y, direction: lastElement.direction});
                break;
        }
        console.log(snake.length);
        score++;
    }
}

function checkCollisionWithItself() {
    var x = snake[0].x;
    var y = snake[0].y;
    var collision = false;

    snake.forEach(function(element, index){
        if(index != 0) {
            if(element.x == x && element.y == y) {
                collision = true;
            }
        }
    })

    if(collision) {
        restart();
    }
}

function restart() {
    snake = [ {x: canvas.width/2, y: canvas.height-30, direction: 1}, {x: canvas.width/2, y: canvas.height-20, direction: 1}, {x: canvas.width/2, y: canvas.height-10, direction: 1} ];
    foodX = Math.floor(Math.random() * canvas.width - foodWidth) + 1;
    foodY = Math.floor(Math.random() * canvas.height - foodHeight) + 1;
    score = 0;
}

document.addEventListener("keydown", keyDownHandler, false);

var interval = setInterval(draw, 100);
```

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
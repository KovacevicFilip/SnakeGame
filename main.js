class Snake {
    constructor(){

        let wrapper = document.querySelector('#wrapper');  
        let snakeBody = [{
            x: 10,
            y: 11
         },
         {
            x: 10,
            y: 12
         },
         {
            x: 10,
            y: 13
         }
        ]; 

        var dxy = { // this are values for moving a snake on x/y 
            dx: 1,
            dy: 0
        };
        var counter = 0 // counter for collecting points

        let food = {
      //   x: Math.floor(Math.random() * 30), 
      //   y: Math.floor(Math.random() * 30)     
            x: 10,
            y: 10   
        };
 
         function generateFood(){ // this function is for generation food during a game
            food.x = Math.floor(Math.random() * 30), 
            food.y = Math.floor(Math.random() * 30);
        };
         function foodStop(){
            for(let i = 0; i < snakeBody.length; i++){
               if(snakeBody[i].x == food.x && snakeBody[i].y == food.y){                  
                  generateFood();
               }
            }
         };
         function eatFood(){            
            console.log(`x: ${food.x} y: ${food.y}`);
            for(let i = 0; i < snakeBody.length; i++) { // when snake head and food are on the same spot, the food is gonna be eaten
               if(snakeBody[0].x == food.x && snakeBody[0].y == food.y) {
                  
                  generateFood();
                  score();
                  snakeBody.push(snakeBody[snakeBody.length - 1]);
               }            
               
            }
         };
        
        this.moveSnake = function(event) {
            
            if (event.keyCode == 38) {
               console.log("UP");
               if(dxy.dy != 1){ // uslov u uslovu je postavljen da snakeBody ne bi mogla da krene unazad ili da bude kraj igre, a da se snakeBody nije sudarila,
                  dxy.dx = 0;   // tj da joj se glava poklopi sa prvim poljem .. ukoliko se to dogodi, vrednosi dxy.dx i dxy.dy se nece promeniti posto one ni u jednom
                  dxy.dy = -1;   // slucaju ne smeju biti istovremeno jednake nuli, jer bi to zaustavilo zmijicu
               }
            };
   
            if (event.keyCode == 40) {
               console.log("DOWN");
               if(dxy.dy != -1){
                  dxy.dx = 0;
                  dxy.dy = 1;
               }
            };
   
            if (event.keyCode == 37) {
               console.log("LEFT");
               if(dxy.dx != 1){
                  dxy.dx = -1;
                  dxy.dy = 0;
               }
            };
   
            if (event.keyCode == 39) {
   
               console.log("RIGHT");
               if(dxy.dx != -1){
                  dxy.dx = 1;
                  dxy.dy = 0;
               }
            };
        };
        
        function move() {

            var snakeHead = {
               x: snakeBody[0].x + dxy.dx,
               y: snakeBody[0].y + dxy.dy,
            }
   
            snakeBody.unshift(snakeHead); /* is should add snake head */
            snakeBody.pop(snakeBody[snakeBody.length - 1]); /* it removes snake tail */
   
        };
        function troughTheWall(){
            if(snakeBody[0].x == 30) snakeBody[0].x = 0; // uzima se broj 30 zato sto wrapper ima 30 polja, a broji se od 0 pa je broj 30 zapravo 31. polje i tada je
            if(snakeBody[0].x == -1) snakeBody[0].x = 29;// zmija vec izasla iz wrappera
            if(snakeBody[0].y == 30) snakeBody[0].y = 0;
            if(snakeBody[0].y == -1) snakeBody[0].y = 29;
         };

         function score(){
            counter = counter + 5;
            let score = document.getElementById("point");
            score.innerHTML = counter;
         }

        function restartWrapper() { // this function restart wrapper so it can be rendered again
            wrapper.remove();
            wrapper = document.createElement("div");
            wrapper.id = "wrapper";
            document.body.appendChild(wrapper);
        }
        function theEnd(){
         for(let i = 1; i < snakeBody.length; i++){
            if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y){
               clearInterval(loop);
               // prenesi();
               document.getElementById("scoreWrapper").style.display = "block";
               document.getElementById("finalScore").innerHTML = counter;
            }
         }
      }

        let renderBoard = function() {
            
            restartWrapper(); /*funkcija koja generise wrapper */
            move(); /* funkcija koja belezi kretanje */
            eatFood();
            foodStop();
            troughTheWall();
            theEnd();
        
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {

                    let field = document.createElement('div');
                     field.className = 'field';

                    for (let z = 0; z < snakeBody.length; z++) {
                    if (i == snakeBody[z].y && j == snakeBody[z].x) {
                        field.className = "snakeBody";
                     }
                    }

                    if (i == food.y && j == food.x) {
                        field.className = "food"
                    }
                     wrapper.appendChild(field);
                    
                }
                
            }
            
        };
        let loop = setInterval(renderBoard,130);
        
    }
}

var snake = new Snake();



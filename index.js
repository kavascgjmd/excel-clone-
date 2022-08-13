let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillStyle = "black";
c.fillRect(0,0,canvas.width, canvas.height);

const gravity = 0.7;



let player = new Fighter(
    "./samuraiMack/Idle.png",{
    position : {
        x : 100,
        y : 0
    },
    velocity :{
        x : 0,
        y : 0
    }
    
},"red",
offset = {
    x : 160,
    y : 100,
},

 2,
 8,

 offset2 = {
    x : 115,
    y : 100
 }
,
 sprites = {
 idle : {
  imgsrc : "./samuraiMack/Idle.png",
  framesMax : 8,
 },
  run : {
    imgsrc : "./samuraiMack/Run.png",
    framesMax : 8,
  },
  jump : {
    imgsrc : "./samuraiMack/Jump.png",
    framesMax : 2,
  },
  fall : {
   imgsrc : "./samuraiMack/Fall.png",
   framesMax : 2,
  },
  attack1 : {
    imgsrc : "./samuraiMack/Attack1.png",
    framesMax : 6,
   },
   takehit : {
    imgsrc : "./samuraiMack/Take Hit - white silhouette.png",
    framesMax : 4,
   },
   death : {
    imgsrc : "./samuraiMack/Death.png",
    framesMax : 6,
   }
 }

)

let enemy = new Fighter("./kenji/Idle.png",{
    position : {
        x : 874,
        y: 0
    },
    velocity : {
        x : 0,
        y : 0
    },
  
},"blue",
offset = {
    x: -80,
    y : 100,
},
2,
4,

offset2 = {
   x : 115,
   y : 100
},
sprites = {
idle : {
 imgsrc : "./kenji/Idle.png",
 framesMax : 4,
},
 run : {
   imgsrc : "./kenji/Run.png",
   framesMax : 8,
 },
 jump : {
   imgsrc : "./kenji/Jump.png",
   framesMax : 2,
 },
 fall : {
  imgsrc : "./kenji/Fall.png",
  framesMax : 2,
 },
 attack1 : {
   imgsrc : "./kenji/Attack1.png",
   framesMax : 4,
  },
  takehit : {
    imgsrc : "./kenji/Take hit.png",
    framesMax : 3,
   },
   death : {
    imgsrc : "./kenji/Death.png",
    framesMax : 7,
   }
}


)

let keys = {
    a : {
    pressed : false
    },
    d: {
    pressed : false
    },
    w : {
        pressed : false
    },
    ArrowLeft  : {
        pressed : false 
    },
    ArrowRight : {
        pressed : false
    },
    ArrowUp : {
     pressed : false
    }

}

let background = new Sprite(
    {
    x:0,
    y :0,
},
"./bgtg.png",)


function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width, canvas.height);
    background.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;
    
    if(keys.a.pressed && player.lastKey === 'a'){
      player.velocity.x = -5;
      player.switchsprite("run");    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5;
        player.switchsprite("run");;  
    }
    else{
        player.switchsprite("idle");
    }

    if(player.velocity.y < 0)
    {
        player.switchsprite("jump");
        
    }    
    else if(player.velocity.y > 0){
        player.switchsprite("fall");
    }
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5;
        enemy.switchsprite("run");  
      }
      else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
          enemy.velocity.x = 5;
          enemy.switchsprite("run");  
      }
      else{
        enemy.switchsprite("idle");
      }
      if(enemy.velocity.y < 0)
      {
          enemy.switchsprite("jump");
          
      }    
      else if(enemy.velocity.y > 0){
          enemy.switchsprite("fall");
      }

      if(player.attackbox.position.x + player.attackbox.width >= enemy.position.x && 
        player.position.x <= enemy.position.x &&
        player.attackbox.position.y + player.attackbox.height>= enemy.position.y &&
        player.attackbox.position.y <= enemy.position.y + enemy.height && player.attacking && player.framesCurrent === 4 ){
        
            player.attacking = false;
            let enemyhealth = document.querySelector("#enemyhealth");
            enemy.health -= 20;
            enemyhealth.style.width = enemy.health+"%";
            if(enemy.health <= 0){
            enemy.switchsprite("death");
            }
            else{
            enemy.switchsprite("takehit");}
            console.log("hu");
      }
      if(player.attacking && player.framesCurrent === 4){
        player.attacking = false;
      }
      if(enemy.attackbox.position.x - enemy.attackbox.width <= player.position.x && 
             enemy.position.x >= player.position.x &&
             enemy.position.y +      enemy.attackbox.height>= player.position.y &&
             enemy.position.y <= player.position.y + player.height &&      enemy.attacking ){
            enemy.attacking = false;
         
            let playerhealth = document.querySelector("#playerhealth");
            player.health -= 20;
            if(player.health <= 0){
               player.switchsprite("death");
            }
            else {
            player.switchsprite("takehit");}
            playerhealth.style.width = player.health+"%";
            console.log("hi");
      }

      if(enemy.attacking && enemy.framesCurrent === 1){
        enemy.attacking = false;
      }
      
    player.update();
 
    enemy.update();

    if(enemy.health === 0 || player.health === 0){
        document.querySelector("#textdisplay").style.display = "flex";
        if(player.health === enemy.health){
            document.querySelector("#textdisplay").innerHTML = "tie"; 
        }
        else if(player.health > enemy.health){
        document.querySelector("#textdisplay").innerHTML = "Player 1 wins";
            
        }
        else {
        document.querySelector("#textdisplay").innerHTML= "Player 2 wins";
         
        }

        clearTimeout(timerid);
    }
    
}
let timer = 60;
let timerid ;
 function settimer(){
     if(timer > 0){
        timer -- ;
        timerid = setTimeout(settimer , 1000);
        document.querySelector("#timer").innerHTML = timer;
     }
     if(timer === 0){
        document.querySelector("#textdisplay").style.display = "flex";
        if(player.health === enemy.health){
            document.querySelector("#textdisplay").innerHTML = "tie"; 
        }
        else if(player.health > enemy.health){
        document.querySelector("#textdisplay").innerHTML = "Player 1 wins";
            
        }
        else {
        document.querySelector("#textdisplay").innerHTML= "Player 2 wins";

        }
     }
}

window.addEventListener("keydown", function(e){
 if(!player.dead){
    switch (e.key){
        case 'd' : 
        keys.d.pressed = true;
        player.lastKey = 'd';
        break;
        case 'a' : 
        keys.a.pressed = true;
        player.lastKey = 'a';
        break;
        case 'w' : 
        player.velocity.y = -20;
        break;
        case ' ' : 
        player.attack();
        break;
    }}
if(!enemy.dead){
    switch(e.key){
        case 'ArrowDown' : 
        enemy.attack();
        break;
        case 'ArrowLeft' : 
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = 'ArrowLeft';
        break;
        case 'ArrowRight' : 
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
        break;
        case 'ArrowUp' : 
        enemy.velocity.y = -20;
        break;
        
    }
}})
window.addEventListener("keyup", function(e){
    switch (e.key){
        case 'd' : 
        keys.d.pressed = 0;
        break;
        case 'a' : 
        keys.a.pressed = 0;
        break;
        
    }

    switch (e.key){
        case 'ArrowLeft' : 
        keys.ArrowLeft.pressed = 0;
        break;
        case 'ArrowRight' : 
        keys.ArrowRight.pressed = 0;
        break;
        
    }
})
animate();
settimer();
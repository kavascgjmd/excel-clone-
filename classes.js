class Sprite{
    constructor(position, imgsrc , scale = 1, framesMax = 1) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
    
        this.image.src = imgsrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }
    draw(){
        
            c.drawImage(this.image,
                this.framesCurrent * (this.image.width / this.framesMax) ,
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x,
                this.position.y,
                 (this.image.width / this.framesMax) * this.scale,
                 this.image.height * this.scale) 
     
 

    }
    update(){
        this.draw();
        this.framesElapsed ++ ;
        if(this.framesElapsed %  this.framesHold === 0){
        if(this.framesCurrent < this.framesMax - 1){
            this.framesCurrent++;
        }
        else {
            this.framesCurrent = 0;
        }
    }}
}
class Fighter {
    constructor(imgsrc, { position , velocity}, color, offset, scale = 1, framesMax = 1 , offset2 = {x:0, y:0} , sprites){
    
     
        this.position = position;
        this.scale = scale;
        this.framesMax = framesMax;
        this.image = new Image();
        this.image.src = imgsrc;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey 
        this.color = color;
        this.attacking ;
        this.health = 100;
        this.offset2 = offset2;
        this.attackbox = {
        position : {
            x : this.position.x,
            y : this.position.y,
        },
        offset,
        width : 100,
        height : 50,
        }
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.death = false;
       for(const sprite in this.sprites){
        sprites[sprite].image =  new Image();
        sprites[sprite].image.src = sprites[sprite].imgsrc;
       }
    }
    draw(){
           
            c.drawImage(this.image,
            this.framesCurrent * (this.image.width / this.framesMax) ,
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x-this.offset2.x,
            this.position.y-this.offset2.y,
             (this.image.width / this.framesMax) * this.scale,
             this.image.height * this.scale) 
 

      
}
   
    update(){
        this.draw();
        if(!this.dead){
        this.framesElapsed ++ ;
        if(this.framesElapsed %  this.framesHold === 0){
        if(this.framesCurrent < this.framesMax - 1){
            this.framesCurrent++;
        }
        else {
            this.framesCurrent = 0;
        }
    }}
        this.attackbox.position.x = this.position.x+this.attackbox.offset.x;
        this.attackbox.position.y = this.position.y+this.attackbox.offset.y;
       
        // if(this.attacking)
        // {
             c.fillStyle = 'green';
        // c.fillRect(this.attackbox.position.x, this.attackbox.position.y,
        // this.attackbox.width, this.attackbox.height);
        // }
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y >= canvas.height- 40){
            this.velocity.y = 0;
          this.position.y = 386.1;
        }
        else {
            this.velocity.y += gravity;
        }
        // console.log(this.position.y);
    }

    attack(){
        this.switchsprite("attack1");
        this.attacking =true;
        // setTimeout(() => {
        //  this.attacking = false;
        
        // } , 100)
        
    }

    switchsprite(sprite){

        if(this.image  === this.sprites["death"].image ){
           if(this.framesCurrent === this.sprites["death"].framesMax -1){
            this.dead = true;
         
           }
           return;
           
        }
        if(this.image === this.sprites["attack1"].image && this.framesCurrent < this.sprites["attack1"].framesMax  - 1){
            return;
        }
        if(this.image === this.sprites["takehit"].image && this.framesCurrent < this.sprites["takehit"].framesMax  - 1){
            return;
        }
        switch(sprite) {
            case 'run' :
            if(this.image !== this.sprites["run"].image){
                this.image = this.sprites["run"].image;
                this.framesMax = this.sprites["run"].framesMax;
                this.framesCurrent = 0;            }
            break;
            case 'jump':
                if(this.image !== this.sprites["jump"].image){
                    this.image = this.sprites["jump"].image;
                    this.framesMax = this.sprites["jump"].framesMax;
                    this.framesCurrent = 0;            }
                
            break;
            case 'idle':
                if(this.image !== this.sprites["idle"].image){
                    this.image = this.sprites["idle"].image;
                    this.framesMax = this.sprites["idle"].framesMax;
                    this.framesCurrent = 0;            }
                
            break;        
            case 'fall':
                if(this.image !== this.sprites["fall"].image){
                    this.image = this.sprites["fall"].image;
                    this.framesMax = this.sprites["fall"].framesMax;
                    this.framesCurrent = 0;            }
                
            break;  

            case 'attack1':
                if(this.image !== this.sprites["attack1"].image){
                    this.image = this.sprites["attack1"].image;
                    this.framesMax = this.sprites["attack1"].framesMax;
                    this.framesCurrent = 0;            }
                
            break;  
            case 'takehit' :
                if(this.image !== this.sprites["takehit"].image){
                    this.image = this.sprites["takehit"].image;
                    this.framesMax = this.sprites["takehit"].framesMax;
                    this.framesCurrent = 0;            }
                break;
                case 'death' :
                    if(this.image !== this.sprites["death"].image){
                        this.image = this.sprites["death"].image;
                        this.framesMax = this.sprites["death"].framesMax;
                        this.framesCurrent = 0;
                                 }
                    break;
        }
    }
}
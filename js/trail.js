var particle;
var yoff = 0.0;
var radius = 50;
var particles=[];

var setup = function(){
    var myCanvas = createCanvas(500, 500);
    myCanvas.parent('container')
    background(0);
    for( var i = 1 ;  i<= 8; i++){
        particle = new Particle(random(width), 0);
        particles.push(particle);
    }
    for( var i = 1 ;  i<= 8; i++){
        particle = new Particle(random(width), height);
        particles.push(particle);
    }
}

var draw = function(){
    background(0);
    for (var i = 1 ; i < particles.length ; i++){
        var p = particles[i];
        p.update();
        p.show();
    }
}

//PARTICLE
var Particle = function(x,y) {
    this.pos = createVector(x,y)
    this.vel = createVector(0,random(2,4))
    this.history= [];
    this.temperature = random(1);

    this.update = function(){
        if (this.temperature <= 0){
            this.pos = createVector(this.pos.x +random(-2,2), this.pos.y + this.vel.y)
        }
        if (this.temperature >= 1){
            this.pos = createVector(this.pos.x +random(-2,2), this.pos.y - this.vel.y)
        }
        if( this.pos.y > height-20){
            this.pos.y = height-20
        }
        if( this.pos.y < 0){
            this.pos.y = 0
        }
        if (this.pos.y == height-20){
            this.temperature += 0.005;
        }
        if (this.pos.y == 0){
            this.temperature -= 0.005;
        }
        this.history.push(this.pos);
        if (this.history.length > 80){
            this.history.splice(0, 1);
        }
    }

    this.show= function(){
        for( var i = 0; i < this.history.length ; i++) {
            var pos = this.history[i];
            var o = map(i, 0, this.history.length, 0,255)
            var heat = map(this.temperature, 0, 1, 0, 150)
            //fill(c,map(pos.x, 0, width, 0, 255),map(pos.y, 0, height, 0, 255),c);
            fill(200,heat,0,o)
            noStroke();
            //this.shape(pos.x, pos.y)
            ellipse(pos.x, pos.y, i+40)
        }
        // yoff += 0.02;
    }






    // this.shape = function(px, py){
    //     beginShape();
    //     var xoff = 0;
    //     for (var a = 0; a < TWO_PI; a += 0.02) {
    //       var offset = map(noise(xoff, yoff), 0, 1, -20, 20);
    //       var r = radius + offset;
    //       var x = px + (r * cos(a));
    //       var y = py + (r * sin(a));
    //       vertex(x, y);
    //       xoff += 0.1;
    //      }
    //     endShape();
    // }
}

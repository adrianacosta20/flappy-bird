export default class Score {
    constructor(bird, pipes, ctx, c) {
        this.score = 0;
        this.bird = bird;
        this.pipes = pipes;
        this.ctx = ctx;
        this.c = c;
        this.passed = false;
    };
};

Score.prototype.update=function(){
    this.pipes.forEach((pipe, i)=>{
        if (pipe.xpos + pipe.width + 5 >= this.bird.x) {
            if (this.bird.x > pipe.xpos + pipe.width) {
                this.passed=true;
                this.score += 0.5;
            };
        };
    })
    
};

Score.prototype.render=function(){
    this.ctx.save();
    this.ctx.font= '60px Verdana';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`SCORE: ${this.score}`, 10,50);
    this.ctx.restore();
};
class Dot {
    contructor(x, y, size, col){
        this.x = x; 
        this.y = y; 
        this.size = size; 
        this.col = col; 

    }

    render(){
        noStroke(); 
        fill(this.col); 
        circle(this.x, this.y, this.size, this.size); 
    }
}
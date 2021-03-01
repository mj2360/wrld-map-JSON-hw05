class Rect {
    constructor(x, y, size, col){
        this.x = x; 
        this.y = y; 
        this.size = size; 
        this.color = col; 

    }

    render(){
        noStroke(); 
        fill(this.color); 
        rect(this.x, this.y, this.size, this.size);
    }
}
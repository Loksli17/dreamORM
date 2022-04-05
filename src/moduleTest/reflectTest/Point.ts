export default class Point {
    private x: number;
    private y: number;
    
    private str: string = "";
    private bool:boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get getX() {
        return this.x;
    }

    get getY() {
        return this.y;
    }

    public add(p: Point): Point {
        this.x += p.getX;
        this.y += p.getY;

        return this;
    }
}
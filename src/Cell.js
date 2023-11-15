export default class Cell {
    constructor(tiles, row, column) {
        this.tiles = tiles;
        this.row = row;
        this.column = column;
        this.flagged = false;
        this.opened = false;
        this.mined = false;
        this.number = 0;
    }

    countBombs() {
        
    }
}
<template>
  <section v-if="tiles" class="game">
    <table @contextmenu.prevent="false">
      <tbody>
        <tr v-for="(row, i) of tiles" :key="i">
          <td v-for="(cell, i) of row" :key="i">
            <cell :cell="cell" :gameOver="gameOver" @bomb-found="bombFound" @cell-opened="cellOpened" @cell-changed="isWin"/>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import Cell from "./Cell.vue";
import CellClass from "../Cell.js";

export default {
  name: "MinesweeperGame",
  components: {
    Cell
  },

  props: {
    size: Number,
    bombs: Number,
    gameOver: Boolean,
  },

  data() {
    return {
      tiles: null,      
      bombCount: Number,
    };
  },

  methods: {

    start() {
      this.initTiles();  
    },

    countBombs(){
        for(let x=0;x<this.size;x++){
          for(let y=0;y<this.size;y++){
            var count=0;
            if (x - 1 >= 0 && y - 1 >= 0 && this.tiles[x - 1][y - 1].mined) count++;
            if (x - 1 >= 0 && this.tiles[x - 1][y].mined) count++;
            if (x - 1 >= 0 && y + 1 < this.size && this.tiles[x - 1][y + 1].mined) count++;
            if (y - 1 >= 0 && this.tiles[x][y - 1].mined) count++;
            if (y + 1 < this.size && this.tiles[x][y + 1].mined) count++;
            if (x + 1 < this.size && y - 1 >= 0 && this.tiles[x + 1][y - 1].mined) count++;
            if (x + 1 < this.size && this.tiles[x + 1][y].mined) count++;
            if (x + 1 < this.size && y + 1 < this.size && this.tiles[x + 1][y + 1].mined) count++;
            this.tiles[x][y].number=count;
          }
        }
    },

    canReveal(cell){
      return !cell.mined&&!cell.flagged&&!cell.opened;
    },

    putBombs() {
      let placed = 0;
      const totalBombs = Math.min(this.bombs, this.size * this.size);
      while (placed < totalBombs) {
        const row = Math.floor(Math.random() * this.size);
        const col = Math.floor(Math.random() * this.size);

        const tile = this.tiles[row][col];
        if (!tile.mined) {
          tile.mined = true;
          placed++;
        }
      }
    },

    initTiles() {
      this.bombCount=1;
      this.tiles = new Array(this.size).fill(0).map((row, rowIndex) => {
        return new Array(this.size).fill(0).map((column, columnIndex) => new CellClass(this.tiles, rowIndex, columnIndex));
      });
      //this.putBombs();

      //this.countBombs();
    },

    bombFound(cell) {
      //alert("Bomb found");
      this.$emit("game-finished", false);
    },

    cellOpened(cell){
      cell.opened=true;
        if (this.tiles[cell.row][cell.column].number != 0) return;
        if (cell.row - 1 >= 0 && cell.column - 1 >= 0 && this.canReveal(this.tiles[cell.row - 1][cell.column - 1])) this.cellOpened(this.tiles[cell.row - 1][cell.column - 1]);
        if (cell.row - 1 >= 0 && this.canReveal(this.tiles[cell.row - 1][cell.column])) this.cellOpened(this.tiles[cell.row -1][cell.column]);
        if (cell.row - 1 >= 0 && cell.column + 1 < this.size && this.canReveal(this.tiles[cell.row - 1][cell.column + 1])) this.cellOpened(this.tiles[cell.row - 1][cell.column + 1]);
        if (cell.column - 1 >= 0 && this.canReveal(this.tiles[cell.row][cell.column - 1])) this.cellOpened(this.tiles[cell.row][cell.column - 1]);
        if (cell.column + 1 < this.size && this.canReveal(this.tiles[cell.row][cell.column + 1])) this.cellOpened(this.tiles[cell.row][cell.column + 1]);
        if (cell.row + 1 < this.size && cell.column - 1 >= 0 && this.canReveal(this.tiles[cell.row + 1][cell.column - 1])) this.cellOpened(this.tiles[cell.row + 1][cell.column - 1]);
        if (cell.row + 1 < this.size && this.canReveal(this.tiles[cell.row + 1][cell.column])) this.cellOpened(this.tiles[cell.row + 1][cell.column]);
        if (cell.row + 1 < this.size && cell.column + 1 < this.size && this.canReveal(this.tiles[cell.row + 1][cell.column + 1]) ) this.cellOpened(this.tiles[cell.row + 1][cell.column + 1]);
    },

    isWin(){
      var countFlaggedBombs=0;
      for(let y=0;y<this.size;y++){
        for(let x=0;x<this.size;x++){
            if(this.tiles[y][x].mined && this.tiles[y][x].flagged){
              countFlaggedBombs++;
            }
            if(this.tiles[y][x].mined && !this.tiles[y][x].flagged){
              return;
            }
        }
      }
      if(countFlaggedBombs == this.bombs){
        this.$emit("game-finished", true);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
table {
  user-select: none;
  margin: auto;

  td {
    min-width: 30px;
  }
}
</style>
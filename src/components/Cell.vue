<template>
<div @click.left="openCell" @click.right="flagCell">
    <img :src="imageSrc" :style="style" />
</div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    cell: Object,
    gameOver: Boolean
  },

  data() {
    return {      
    };
  },

  computed: {
    imageSrc() {
      if (this.cell.opened) return this.cellNumber;
      if (this.cell.flagged) return "../src/assets/flag.png";
      if(this.gameOver) return this.cell.mined ? "../src/assets/bomb.png" : this.cellNumber;
      return "../src/assets/begin.png";
    },

    style() {
      return {
        opacity: this.cell.opened && this.cell.number == 0 ? 0.6 : 1.0 
      };
    },

    strCell() {
      if (this.cell.opened) return this.cell.number;
      if (this.cell.flagged) return "Flagged";
      if(this.gameOver) return this.cell.mined ? "Mined" : this.cell.number;
      return "-";
    },

    cellNumber(){
        return `../src/assets/${this.cell.number || 0}.png`;
    },
  },

  methods: {
    openCell() {
      if (this.gameOver) return;
      if(!this.cell.flagged){
        if (this.cell.mined) {
        this.$emit("bomb-found", this.cell);
        return;
      }
      this.cell.opened = true;
      // TODO: 
      this.$emit("cell-opened",this.cell);
      this.$emit("cell-changed");
      }
    },

    flagCell() {
      if (this.gameOver) return;
      if (!this.cell.opened) {
        this.cell.flagged = !this.cell.flagged;
      }
      this.$emit("cell-changed");
    },
  },

  mounted() {

    },
};
</script>

<style lang="scss" scoped>
img {
  max-width: 30px;
}

</style>
<template>
  <div class="app">
    <h1>Minesweeper</h1>
    <template v-if="!started || gameOver">
      <div class="column">
        Size:
        <input type="number" min="5" v-model.number="size" />
      </div>
      <div class="column">
        Bombs:
        <input type="number" min="5" v-model.number="bombs" />
      </div>
      <div class="column"><button @click="startGame">Start!</button></div>
    </template>
    <p v-if="gameOver && isWin">You won!</p>
    <p v-if="gameOver && !isWin">You lost!</p>
    <game
      :size="size"
      :bombs="bombs"
      :game-over="gameOver"
      ref="game"
      @game-finished="gameFinished"
    />
  </div>
</template>

<script>
import Game from "./components/Game.vue";

export default {
  name: "App",
  components: {
    Game,
  },
  data() {
    return {
      started: false,
      gameOver: false,
      isWin: false,
      size: 8,
      bombs: 12,
    };
  },
  methods: {
    startGame() {
      this.started = true;
      this.gameOver = false;
      this.$refs.game.start();
    },

    gameFinished(isWin) {
      this.gameOver = true;
      this.isWin = isWin;
    },
  },

  created() {
    //
  },

  mounted() {
    //
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}

.column {
  display: inline-block;
  width: calc(30% - 5px);
  background-color: #5f9ea0;
  border-radius: 4px;
  padding: 5px;
  margin: 5px;
}

.column input {
  width: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  line-height: 20px;
}

.column button {
  background: transparent;
  border: transparent;
  line-height: 20px;
  color: white;
  font-weight: bold;
}
</style>

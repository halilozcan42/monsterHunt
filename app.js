new Vue({
  el: "#app",
  data: {
    player_health: 100,
    monster_health: 100,
    game_is_on: false,
    logs: [],
  },
  methods: {
    start_game: function () {
      this.game_is_on = true;
    },
    attack: function () {
      let point = Math.ceil(Math.random() * 10);
      this.monster_health -= point;
      this.add_to_log({ turn: "P", text: "PLAYER'S ATTACK(" + point + ")" });
      this.monster_attack();
    },
    special_attack: function () {
      let point = Math.ceil(Math.random() * 25);
      this.monster_health -= point;
      this.add_to_log({
        turn: "P",
        text: "PLAYER'S SPECIAL ATTACK(" + point + ")",
      });
      this.monster_attack();
    },
    heal_up: function () {
      let point = Math.ceil(Math.random() * 20);
      this.player_health += point;
      this.add_to_log({ turn: "P", text: "PLAYER HEAL UP(" + point + ")" });
      this.monster_attack();
    },
    give_up: function () {
      this.player_health = 0;
      this.add_to_log({ turn: "P", text: "THE PLAYER GAVE UP" });
    },
    monster_attack: function () {
      let point = Math.ceil(Math.random() * 15);
      this.player_health -= point;
      this.add_to_log({ turn: "M", text: "MONSTER'S ATTACK(" + point + ")" });
    },
    add_to_log: function (log) {
      this.logs.push(log);
    },
  },
  watch: {
    player_health: function (value) {
      if (value <= 0) {
        this.player_health = 0;
        if (confirm("GAME OVER, Do you want to restart the game")) {
          this.player_health = 100;
          this.monster_health = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.player_health = 100;
      }
    },
    monster_health: function (value) {
      if (value <= 0) {
        this.monster_health = 0;
        if (confirm("YOU WON, Do you want to restart the game")) {
          this.player_health = 100;
          this.monster_health = 100;
          this.logs = [];
        }
      }
    },
  },
});

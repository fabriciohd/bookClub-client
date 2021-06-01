<template>
  <div id="calendar">
    <div class="infos">
      <div class="head">
        <a class="previous" @click="showTable()">&#8249;</a>
        <div class="title">
          {{ item.title }}
        </div>
      </div>
      <v-date-picker
        :min-date="new Date()"
        :max-date="new Date(date.setMonth(date.getMonth() + 2))"
        :disabled-dates="disabledDates"
        v-model="range"
        is-range
      />
      <button class="reserve-btn" @click="reserve()">Reservar</button>
    </div>
    <notifications style="margin-top: 10px" />
  </div>
</template>

<script>
import { baseApiUrl } from "@/global.js";

export default {
  name: "Calendar",
  data() {
    return {
      date: new Date(),
      disabledDates: [],
      range: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showTable() {
      this.$emit("return-table", {});
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    reserve() {
      this.$http
        .post(
          `${baseApiUrl}/reservation`,
          {
            title_id: this.item.id,
            start_date: this.formatDate(this.range.start),
            end_date: this.formatDate(this.range.end),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.$notify({
            type: "success",
            text: res.data.msg,
          });
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            text: error.response.data.error,
          });
        });
    },
  },
  mounted() {
    this.$http
      .get(`${baseApiUrl}/title/disableddates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          title_id: this.item.id,
        },
      })
      .then((res) => {
        this.disabledDates = res.data.disabledDates;
      })
      .catch((error) => {
        this.$notify({
          type: "error",
          text: error.response.data.error,
        });
      });
  },
};
</script>

<style scoped>
#calendar {
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
}
.infos {
  display: flex;
  flex-direction: column;
}
.head {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.previous {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  background-color: #f1f1f1;
  color: black;
  border-radius: 50%;
  cursor: pointer;
  margin-right: -37px;
  justify-self: flex-start;
  z-index: 1;
}
.title {
  flex-grow: 1;
  cursor: default;
  font-weight: 500;
}
.reserve-btn {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.reserve-btn:hover {
  background-color: #04aaaa;
}
.reserve-btn:active {
  background-color: #73b875;
}
</style>
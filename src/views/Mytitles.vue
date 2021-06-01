<template>
  <div id="mytitles">
    <div class="box">
      <table id="customers" class="table-mytitles">
        <tr>
          <th>ID</th>
          <th>Título</th>
        </tr>
        <tr v-for="title in titles" :key="title.id">
          <td>{{ title.id }}</td>
          <td>{{ title.title }}</td>
        </tr>
      </table>
      <form method="post" @submit.prevent="addTitle($event)">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Adicionar Título"
        />
        <button>Enviar</button>
      </form>
    </div>
    <notifications style="margin-top: 10px" />
  </div>
</template>

<script>
import { baseApiUrl } from "@/global.js";

export default {
  name: "Mytitles",
  data() {
    return {
      titles: {},
    };
  },
  methods: {
    addTitle(event) {
      this.$http
        .post(
          `${baseApiUrl}/title`,
          {
            title: event.target.elements.title.value,
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
      event.target.elements.title.value = "";
    },
    getTitles() {
      this.$http
        .get(`${baseApiUrl}/titles`, {
          params: {
            mytitles: true,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.titles = res.data.list;
        });
    },
  },
  mounted() {
    this.getTitles();
  },
  updated() {
    this.getTitles();
  },
};
</script>

<style scoped>
#mytitles {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-mytitles {
  width: 300px;
}
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
form {
  display: flex;
  align-items: center;
}
button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 12px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
button:hover {
  background-color: #04aaaa;
}
button:active {
  background-color: #73b875;
}
</style>
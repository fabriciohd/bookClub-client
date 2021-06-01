<template>
  <div class="home">
    <table id="customers" v-if="showTitles">
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Proprietario</th>
      </tr>
      <tr v-for="item in titles" :key="item.id" @click="selectTitle(item)">
        <td>{{item.id}}</td>
        <td>{{item.title}}</td>
        <td>{{item.owner}}</td>
      </tr>
    </table>
    <Calendar @return-table="selectTitle({})" :item="itemTitle" v-else />
  </div>
</template>

<script>
import { baseApiUrl } from "@/global.js";
import Calendar from "@/components/Calendar.vue";

export default {
  name: "Home",
  components: { Calendar },
  data() {
    return {
      titles: {},
      itemTitle: {},
      showTitles: true
    };
  },
  methods: {
    getTitles() {
      this.$http
        .get(
          `${baseApiUrl}/titles`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(res => {
          this.titles = res.data.list;
        });
    },
    selectTitle(item) {
      this.showTitles = !this.showTitles;
      this.itemTitle = item;
    }
  },
  beforeMount() {
    this.getTitles();
  }
};
</script>

<style scooped>
.home {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  max-width: 500px;
  max-height: 400px;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
  cursor:pointer;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

#customers th:nth-child(1) {
  width: 10px;
}
</style>
<template>
    <nav class="topnav">
        <router-link to="/">Títulos</router-link>
        <router-link to="/mytitles">Meus Títulos</router-link>
        <a style="float:right" @click="logout()">Logout</a>
    </nav>
</template>

<script>
export default {
    name: 'Header',
    methods: {
      logout() {
        localStorage.setItem("token", '');
        this.$router.push("/login");
      }
    }
};
</script>

<style scoped>
  .topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}
</style>
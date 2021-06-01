<template>
  <div id="app">
    <Header v-if="this.$route.path != '/Login'" />
    <router-view />
    <notifications style="margin-top: 10px" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { baseApiUrl } from "@/global.js";

export default {
  components: { Header },
  methods: {
    tokenValidate() {
      if (this.$route.path != "/Login") {
        this.$http
          .post(
            `${baseApiUrl}/auth/validate`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          ).then(res => {
            this.$store.commit('setUser', res.data.user);
          })
          .catch(error => {
            if (error.response.status == 401) {
              if (localStorage.getItem('token')) {
                this.$notify({
                  type: "error",
                  text: "Sua sessão expirou, relogue para continuar navegando!",
                });
              }
              this.$router.push("Login");
            }
          });
      }
    },
  },
  mounted() {
    this.tokenValidate();
  },
  updated() {
    this.tokenValidate();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

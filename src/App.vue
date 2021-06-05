<template>
  <div id="app">
    <div id="nav">
      <router-link 
        to="/static-flat/"
        custom
        v-slot="{ isActive, href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="btn"
          :class="isActive ? 'btn-primary' : 'btn-outline-primary'"
        >
          Статический Флэт
        </a>
      </router-link>
      <router-link
        to="/dynamic-flat/"
        custom
        v-slot="{ isActive, href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="btn"
          :class="isActive ? 'btn-primary' : 'btn-outline-primary'"
        >
          Динамический Флэт
        </a>
      </router-link>
      <router-link
        to="/kelly/"
        custom
        v-slot="{ isActive, href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="btn"
          :class="isActive ? 'btn-primary' : 'btn-outline-primary'"
        >
          Критерий Келли
        </a>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: inline-block;
  padding: 30px;
}

#nav a {
  margin-right: 20px;
}

.links {
  display: block;
}
</style>

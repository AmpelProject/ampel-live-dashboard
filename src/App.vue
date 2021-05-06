<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="light" variant="light">
          <b-navbar-brand href="/">
            <img
              src="https://placekitten.com/g/30/30"
              class="d-inline-block align-top"
              alt="Kitten"
            />
            Ampel
          </b-navbar-brand>
        <b-nav-item to="/events">Events</b-nav-item>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

#nav {
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

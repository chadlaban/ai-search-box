<!-- eslint-disable prettier/prettier -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container" id="container">
      <router-link class="navbar-brand" to="/">AI SearchBox</router-link>
      <button class="navbar-toggler nav-button" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item nav-item-hover" :class="{ 'active': $route.path === '/about' }">
            <router-link class="nav-link" to="/about">About Us</router-link>
          </li>
          <li class="nav-item nav-item-hover" :class="{ 'active': $route.path === '/featured' }">
            <router-link class="nav-link" to="/featured">Featured</router-link>
          </li>
          <!-- <li class="nav-item" :class="{ 'active': $route.path === '/my-favorites' }">
            <router-link class="nav-link" to="/my-favorites">My Favorites</router-link>
          </li> -->
          <li class="nav-item nav-item-hover" :class="{ 'active': $route.path === '/community' }">
            <router-link class="nav-link" to="/community">Community</router-link>
          </li>
          <!-- <li class="nav-item" :class="{ 'active': $route.path === '/sign-in' }">
            <router-link class="nav-link" to="/sign-in">Sign In</router-link>
          </li> -->
          &nbsp;
          &nbsp;
          &nbsp;
          <li class="nav-item" :class="{ 'active': $route.path === '/submit-tool' }" style="background-color: #EE9B01;
          border-radius: 26px;
          padding: 0px 8px;">
            <router-link class="nav-link" to="/submit-tool">Submit Tool</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  name: "NavBar",
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.navbar {
  #container {
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
  }

  .navbar-brand {
    position: relative;
    bottom: 1px;
    color: #FFFFFF;
    /* left: 24%; */
  }

  .navbar-nav {
    max-width: max-content;
    margin: auto;

    .nav-item {
      border-radius: 25px;
    }

    > li {
      margin: 0px 5px 0px 5px;
    }
  }
}

.navbar-nav .nav-item.active .nav-link {
  /* background: #D9D9D9; */
  color: #000000 !important;
  border-radius: 25px;
  font-weight: 500;
  background-color: #FFFFFF;
}

.navbar-nav .nav-item .nav-link {
  color: #FFFFFF;
}

.nav-item-hover:hover {
  /* Define the hover effect styles here */
  background-color: #e29f37; /* Example color */
  color: white; /* Example color */
  /* Add any other hover styles you want */
}

.bg-light {
  --bs-bg-opacity: 1;
  background-color: #68904D !important;
}
</style>

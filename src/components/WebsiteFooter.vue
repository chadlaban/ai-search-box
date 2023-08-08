<!-- eslint-disable prettier/prettier -->
<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <!-- Left Column -->
        <div class="col-md-6">
          <h4 style="color: #000000;">AI Toolbox</h4>
          <p>Get ready to unlock new possibilities with
            <br />the largest AI tools directory.
          </p>
        </div>

        <!-- Right Column -->
        <div class="col-md-6">
          <div class="social-icons">
            <a href="#" class="social-icon">
              <i class="fa-brands fa-square-facebook fa-xl"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fa-brands fa-square-instagram fa-xl"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fa-brands fa-square-twitter fa-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Horizontal Divider -->
    <hr />

    <!-- Copyright -->
    <div class="container text-center">
      <p>&copy; {{ currentYear }} AI ToolBox. All rights reserved.</p>
    </div>
  </footer>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.footer {
  background-color: #c8d2d1;
  color: #475467;
  padding: 5rem 10rem 1rem 10rem;

    .text-center {
      color: #475467;
    }
}

.social-icons {
  text-align: right;
}

.social-icon {
  display: inline-block;
  margin-right: 10px;
  color: #475467;
}
</style>

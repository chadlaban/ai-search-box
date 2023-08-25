<!-- eslint-disable prettier/prettier -->
<template>
  <div class="body">
    <div class="upper-section"></div>
    <div class="community-container">
      <img id="in-progress-placeholder" src="../assets/imgs/on-the-works.png" />
      <p>Catto is still on her mission in <br />search for the community page!</p>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.body, p {
  animation: myAnim 1s ease 0s 1 normal forwards;
}

@keyframes myAnim {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.upper-section {
  background: rgb(200, 210, 209);
  background: linear-gradient(
    180deg,
    rgba(200, 210, 209, 1) 0%,
    rgba(200, 210, 209, 1) 20%,
    rgba(200, 210, 209, 0) 100%
  );
  padding: 4rem auto 4rem auto;
  height: 20vh;
}

.community-container {
  /* background: rgb(200, 210, 209); */
  background: rgb(202, 210, 209);
  background: linear-gradient(
    180deg,
    rgba(202, 210, 209, 0) 0%,
    rgba(202, 210, 209, 0.5522584033613445) 40%,
    rgba(202, 210, 209, 1) 90%
  );
  height: auto;
  text-align: center; /* Center the image horizontally */

  > p {
    font-family: 'Font Awesome 6 Free';
    font-size: 18px;
    padding: 10px 0 4rem 0;
    margin: 0;
  }
}

#in-progress-placeholder {
    animation: placeholder 1s ease 0s 1 normal forwards;
    max-width: 100%;
    height: auto;
  }

  @keyframes placeholder {
	0% {
		opacity: 0;
		transform: translateY(50px);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

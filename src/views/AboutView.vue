<template>
  <div class="body">
    <div class="upper-section"></div>
    <div class="about-container">
      <div class="container about-us">
        <div class="title">
          <h1>About Us</h1>
        </div>
        <article>
          Welcome to AI SearchBox, where we're dedicated to bringing
          cutting-edge AI tools to your fingertips. Our mission is to empower
          individuals and businesses with the latest advancements in artificial
          intelligence, enabling you to streamline processes, make informed
          decisions, and unlock new possibilities.
        </article>
      </div>
      <div class="container our-vision mt-5">
        <div class="title">
          <h1>Our Vision</h1>
        </div>
        <article>
          At AI SearchBox, we envision a world where AI isn't just a buzzword,
          but a transformative force that enhances lives and reshapes
          industries. We believe in democratizing access to AI tools, making
          them user-friendly and accessible to both tech-savvy experts and those
          new to the field.
        </article>
      </div>
      <div class="container join-us mt-5">
        <div class="title">
          <h1>Join Us on this Journey</h1>
        </div>
        <article>
          Thank you for considering AI SearchBox as your AI partner. We're
          excited to embark on this journey of innovation with you. Whether
          you're a small startup or a global enterprise, we're here to support
          you in harnessing the power of AI for your success.

          <br /><br />Explore our range of AI tools, learn about our solutions,
          and get in touch with us to discover how we can shape the future
          together. <br /><br />Welcome to the future of AI, The AI SearchBox
          Team
        </article>
      </div>
    </div>
    <!-- <div class="lower-section"></div> -->
  </div>
</template>

<style scoped>
.body {
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

.about-container {
  /* background: rgb(200, 210, 209); */
  background: rgb(202, 210, 209);
  background: linear-gradient(
    180deg,
    rgba(202, 210, 209, 0) 0%,
    rgba(202, 210, 209, 0.5522584033613445) 40%,
    rgba(202, 210, 209, 1) 90%
  );
  height: auto;

  .about-us,
  .our-vision,
  .join-us {
    width: 40%;

    > article {
      font-size: 18px;
    }

    > article:last-child {
      font-size: 18px;
      padding-bottom: 5rem;
    }
  }
}

.title {
  width: min-content;

  > h1 {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: 0.15em solid orange; /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: 0.15em; /* Adjust as needed */
    animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
  }
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>

<template>
  <router-view v-slot="{ Component }" class="container">
    <transition name="effect">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup></script>

<style>
body {
  background: #f7f7f7;
}

html,
body,
#app,
.container {
  width: 100%;
  height: 100%;
}

.effect-enter,
.effect-enter-active {
  position: absolute;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  left: 100%;
  transition: all 0.5s ease;
}

.effect-enter-to {
  left: 0;
}

.effect-leave,
.effect-leave-active {
  position: absolute;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  left: 0;
  transition: all 0.5s ease;
}

.effect-leave-to {
  left: -100%;
}
</style>

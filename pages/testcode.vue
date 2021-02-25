<template>
  <div class="container">
      <button :disabled="!isActive">Disable</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
}
<script>
  export let ready;
  export let location;
  import Map from "./Map.svelte";
  import Location from "./Location.svelte";

  import "./global.css"
</script>

<svelte:head>
  <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

  <script
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAgBe8TaYCDQBr-xxyh0x1otjwUpeGuc4k&libraries=geometry,places&callback=initMap">
  </script>
</svelte:head>
<main>
  {#if ready && location}
    <Map {location} />
  {:else if ready && !location}
    <Location on:location={(ev) => (location = ev.detail)} />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
  }
</style>

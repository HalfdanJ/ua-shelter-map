<script>
  export let ready;
  export let location;
  import Map from "./Map.svelte";
  import Location from "./Location.svelte";
</script>

<svelte:head>
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

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

</style>

<script>
  export let ready;
  export let location;
  export let viewport;
  import Map from './Map.svelte';
  import Location from './Location.svelte';
  let map;
  import './global.css';
  const onLocationUpdate = (ev) => {
    location = ev.detail;
    if (map) {
      map.setLocation(ev.detail);
    }
  };
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
  />

  <script
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAgBe8TaYCDQBr-xxyh0x1otjwUpeGuc4k&libraries=geometry,places&callback=initMap">
  </script>
</svelte:head>
<main>
  {#if ready && (location || viewport)}
    <Map bind:this={map} {location} {viewport} />
  {:else if ready && !(location && viewport)}
    <Location
      on:location={onLocationUpdate}
      on:viewport={(ev) => (viewport = ev.detail)}
    />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
  }
</style>

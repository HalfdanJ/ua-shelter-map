<script>
  export let ready;
  import Map from "./Map.svelte";
</script>

<svelte:head>
  <script
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAgBe8TaYCDQBr-xxyh0x1otjwUpeGuc4k&libraries=geometry&callback=initMap">
  </script>
</svelte:head>
<main>
  {#if ready}
    <Map />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 0;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

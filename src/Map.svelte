<script>
  let container;
  let map;
  let zoom = 8;
  let center = { lat: 48.397, lng: 36.644 };

  import { onMount } from "svelte";

  onMount(async () => {
    map = new google.maps.Map(container, {
      zoom,
      center,
    });
    console.log("adding kml");
    var kmlLayer = new google.maps.KmlLayer({
      suppressInfoWindows: true,
      preserveViewport: false,
      map: map,
      url: "/kml/map_0",
    });
  });
</script>

<div class="full-screen" bind:this={container} />

<style>
  .full-screen {
    width: 100vw;
    height: 100vh;
  }
</style>

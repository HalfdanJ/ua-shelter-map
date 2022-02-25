<script>
  let container;
  let map;
  let zoom = 12;

  import { onMount } from "svelte";
  import kml_index from "./kml_index";
  export let location;

  onMount(async () => {
    map = new google.maps.Map(container, {
      zoom,
      center: location,
      mapId: "4b9388789c2d3ecb",
    });
    kml_index.forEach((kml_url) => {
      let kmlLayer = new google.maps.KmlLayer({
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map,
        url: kml_url,
      });
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

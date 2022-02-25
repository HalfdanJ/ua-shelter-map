<script>
  let container;
  let map;
  let zoom = 12;

  import { onMount } from "svelte";
  export let location;

  onMount(async () => {
    console.log(location)
    map = new google.maps.Map(container, {
      zoom,
      center: location,
    });
    console.log("adding kml");
    var kmlLayer = new google.maps.KmlLayer({
      suppressInfoWindows: true,
      preserveViewport: true,
      map: map,
      url: "https://www.google.com/maps/d/u/0/kml?mid=1j_f6ytqZ9kO67Y0cOjgDfqIPmag",
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

<script>
  let container;
  let map;
  let zoom = 12;

  import { onMount } from "svelte";
  import kml_index from "./kml_index";
  export let location;
  let kml_layers = [];
  let infowindow;

  onMount(async () => {
    map = new google.maps.Map(container, {
      zoom,
      center: location,
      mapId: "24b37ddb2193c0b1",
    });
    kml_index.forEach((kml_url) => {
      let kml_layer = new google.maps.KmlLayer({
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map,
        url: kml_url,
      });
      kml_layers.push(kml_layer);
    });

    kml_layers.forEach((kml_layer) => {
      google.maps.event.addListener(kml_layer, "click", function (kmlEvent) {
        if (infowindow) infowindow.close();
        infowindow = new google.maps.InfoWindow({
          content: kmlEvent.featureData.infoWindowHtml,
          position: kmlEvent.latLng,
          map: map,
          pixelOffset: { width: 0, height: -25 },
        });
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

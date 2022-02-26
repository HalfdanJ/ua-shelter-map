<script>
  let container;
  let map;
  let zoom = 16;

  import { onMount } from "svelte";
  import kml_index from "./kml_index";
  export let location;
  export let viewport;

  let kml_layers = [];
  let infowindow;
  let locationMarker;
  export const setLocation = (loc) => {
    if (locationMarker) {
      locationMarker.setLocation(loc);
    }
  };

  onMount(async () => {
    const restriction = new google.maps.LatLngBounds(
      new google.maps.LatLng(43.3614785833, 20.0856083513),
      new google.maps.LatLng(53.3350745713, 42.0807890155)
    );

    if (location && !restriction.contains(location)) {
      zoom = 0;
      location = { lat: 49.476226, lng: 32.579613 };
    }

    map = new google.maps.Map(container, {
      zoom,
      center: location,
      gestureHandling: "greedy",
      mapId: "24b37ddb2193c0b1",
      restriction: {
        latLngBounds: restriction,
        strictBounds: true,
      },
    });
    if (viewport) {
      map.fitBounds(viewport);
    }
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
    locationMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillOpacity: 1,
        strokeWeight: 2,
        fillColor: "#5384ED",
        strokeColor: "#ffffff",
      },
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

<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: [],
  };

  let input;
  let infowindowContent;
  $: autocomplete =
    input && new google.maps.places.Autocomplete(input, options);

  const infowindow = new google.maps.InfoWindow();
  infowindow.setContent(infowindowContent);

  $: {
    autocomplete?.addListener("place_changed", () => {
      infowindow.close();
      const place = autocomplete.getPlace();

      dispatch("location", place.geometry.location);
    });
  }

  function automaticLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          dispatch("location", pos);
         
        }
      );
    }
  }
</script>

<div class="container">
  <div style="font-size:3em">🇺🇦</div>
  <h1>Find shelter</h1>

  <h3>
    Lookup shelter locations in Ukraine
  </h3>
  
  <input type="text" bind:this={input} />

  <div id="infowindow-content" bind:this={infowindowContent}>
    <span id="place-name" class="title" /><br />
    <span id="place-address" />
  </div>

  {#if navigator.geolocation}
  <h3>Or allow automatic location</h3>
  <button on:click={automaticLocation}>Allow Location</button>
  {/if}

  <div style="margin-top: auto">
    <p> Locations are pulled from various
      datasources from <a
        href="https://censor.net/ua/news/3318672/dsns_nagadala_spysok_ukryttiv_po_vsiyi_ukrayini_onovleni_karty"
        >censor.net</a
      >
  </p>
    <p>
    No data gets stored from this website. Full source code is available on <a href="https://github.com/HalfdanJ/ua-shelter-map">github</a>
    </p>
  </div>
</div>

<style>
  .container {
    padding: 12px 42px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    box-sizing: border-box;
  }
  input {
    width: 100%;
  }

  button {
    border-radius: 6px;
  }
</style>

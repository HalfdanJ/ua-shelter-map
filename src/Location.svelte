<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: [],
    componentRestrictions: {
      country: 'ua'
    } 
  };

  let input;
  let button;
  let infowindowContent;
  $: autocomplete =
    input && new google.maps.places.Autocomplete(input, options);

  const infowindow = new google.maps.InfoWindow();
  infowindow.setContent(infowindowContent);

  $: {
    autocomplete?.addListener("place_changed", () => {
      infowindow.close();
      const place = autocomplete.getPlace();
      dispatch("viewport", place.geometry.viewport);
    });
  }

  function automaticLocation() {
    if (navigator.geolocation) {
      button.innerText = "Getting location..."
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          dispatch("location", pos);
         
        }, ()=> {
          button.innerText = 'Sorry, could not get location'
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
  <button on:click={automaticLocation} bind:this={button} >Allow Location</button>
  {/if}

  <div style="margin-top: 30px">
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
    box-sizing: border-box;
  }
  input {
    width: 100%;
  }

  button {
    border-radius: 6px;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';

  const dispatch = createEventDispatcher();

  const options = {
    fields: ['formatted_address', 'geometry', 'name'],
    strictBounds: false,
    types: [],
    componentRestrictions: {
      country: 'ua',
    },
  };

  let input;
  let button;
  let infowindowContent;
  $: autocomplete =
    input && new google.maps.places.Autocomplete(input, options);

  const infowindow = new google.maps.InfoWindow();
  infowindow.setContent(infowindowContent);

  $: {
    autocomplete?.addListener('place_changed', () => {
      infowindow.close();
      const place = autocomplete.getPlace();
      dispatch('viewport', place.geometry.viewport);
      dispatch('location', place.geometry.location);
    });
  }

  function automaticLocation() {
    if (navigator.geolocation) {
      button.innerText = $_('getting-location');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          dispatch('location', pos);
        },
        () => {
          button.innerText = $_('sorry-could-not-get-location');
        }
      );
    }
  }
</script>

<div class="container">
  <div style="font-size:3em">🇺🇦</div>
  <h1>{$_('find-shelter')}</h1>

  <h3>{$_('lookup-shelter')}</h3>

  <input type="text" bind:this={input} />

  <div id="infowindow-content" bind:this={infowindowContent}>
    <span id="place-name" class="title" /><br />
    <span id="place-address" />
  </div>

  {#if navigator.geolocation}
    <h3>{$_('or-allow-automatic-location')}</h3>
    <button on:click={automaticLocation} bind:this={button}
      >{$_('allow-location')}</button
    >
  {/if}

  <div style="margin-top: 30px">
    <p>
      {@html $_('work-in-progress', {
        values: {
          url1: '<a href="https://twitter.com/halfdanj">@halfdanj</a>',
          url2: '<a href="https://twitter.com/GautamBose18">@GautamBose18</a>',
        },
      })}
    </p>
    <p>
      {@html $_('source', {
        values: {
          url: '<a href="https://censor.net/ua/news/3318672/dsns_nagadala_spysok_ukryttiv_po_vsiyi_ukrayini_onovleni_karty">Цензор.НЕТ</a>',
        },
      })}
    </p>
    <p>
      {@html $_('no-data-gets-stored', {
        values: {
          github:
            '<a href="https://github.com/HalfdanJ/ua-shelter-map">github</a>',
        },
      })}
    </p>
  </div>
</div>

<style>
  .container {
    padding: 12px 42px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    max-width: 400px;
    margin: 0 auto;
  }
  input {
    width: 100%;
  }

  button {
    border-radius: 6px;
  }
</style>

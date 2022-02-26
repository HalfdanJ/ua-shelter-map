<script>
  export let onClose = () => {};
  import { _ } from 'svelte-i18n';
</script>

<div class="container">
  <p>
    {$_('find-more')}
    <a
      target="_blank"
      href="https://censor.net/ua/news/3318672/dsns_nagadala_spysok_ukryttiv_po_vsiyi_ukrayini_onovleni_karty"
      >censor.net</a
    >
  </p>
  <button on:click={onClose}>{$_('close')}</button>
</div>

<style>
  .container {
    padding: 8px 12px;
    background-color: white;
    border-radius: 8px;
    position: fixed;
    bottom: 30px;
    z-index: 11;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
  }
  p {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  button {
    margin-bottom: 0px;
    margin-left: 30px;
  }
  @media only screen and (max-width: 600px) {
    button {
      margin-top: 12px;
      margin-left: 0px;
    }
    .container {
      flex-direction: column;
    }
  }
</style>

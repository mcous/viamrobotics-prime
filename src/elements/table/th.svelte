<svelte:options immutable tag="v-th" />

<script lang="ts">
import { addStyles } from '../../lib/index';

export let style = '';

addStyles();
</script>

<th {style} class="p-2 text-neutral-600 font-normal overflow-hidden">
  <slot />
</th>

<style>
:host {
  display: contents !important;
}
</style>

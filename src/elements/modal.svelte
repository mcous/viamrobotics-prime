<svelte:options immutable tag="v-modal" />

<script lang="ts">
import cx from 'classnames';
import { addStyles } from '../lib/index';
import { htmlToBoolean } from '../lib/boolean';
import { dispatcher } from '../lib/dispatch';
import { checkKeyboardEvent } from '../lib/events';

export let title = '';
export let message = '';
export let open = 'false';

const dispatch = dispatcher();

addStyles();

let isOpen: boolean;

$: isOpen = htmlToBoolean(open, 'open');

const handleClose = (event: MouseEvent | KeyboardEvent) => {
  if (event instanceof KeyboardEvent && !checkKeyboardEvent(event, ['Enter'])) {
    return;
  }

  dispatch('close');
};
</script>

<!-- 
  In order to make the overlay keyboard navigable for the keyup behavior we need to apply a tab index to this div.
  svelte-ignore a11y-no-noninteractive-tabindex 
-->
<div
  class={cx(
    'z-50 bg-gray-2 bg-opacity-25 w-full h-full fixed top-0 left-0 flex justify-center items-center',
    {
      invisible: !isOpen,
    }
  )}
  tabindex="0"
  aria-label={`${title}`}
  on:click={handleClose}
  on:keyup|stopPropagation|preventDefault={handleClose}
>
  <div
    class="w-[400px] relative border border-gray-9 bg-white m-2 p-4 max-w-lg shadow-sm"
    on:click|stopPropagation
    on:keyup|stopPropagation
  >
    <button
      class="absolute right-0 top-0 p-3 hover:scale-110 transition-transform text-gray-500 hover:text-gray-9"
      aria-label="Cancel"
      on:click={handleClose}
    >
      <v-icon name="x" size="2xl" />
    </button>

    <figure>
      <figcaption class="mb-2 pr-12 text-2xl font-bold">
        {title}
      </figcaption>

      {#if message}
        <p class="mb-8 text-base">{message}</p>
      {/if}

      <slot />

      <div class="flex flex-row-reverse">
        <slot name="action" />
      </div>
    </figure>
  </div>
</div>

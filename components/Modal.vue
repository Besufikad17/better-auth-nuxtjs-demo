<script setup lang="ts">
import { computed } from 'vue';

const emits = defineEmits(["update:modelValue", "confirm"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
  },
  title: {
    type: String,
    default: "",
  },
  autoClose: {
    type: Boolean,
    default: true,
  },
  enabledOverflow: {
    type: Boolean,
    default: true,
  },
});

const open = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emits("update:modelValue", newVal);
  },
});
</script>

<template>
  <ClientOnly>
    <HeadlessTransitionRoot as="template" :show="open">
      <HeadlessDialog
        as="div"
        class="relative z-[200]"
        @close="autoClose ? (open = false) : ''"
      >
        <HeadlessTransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity"
          />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <HeadlessTransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialogPanel
                :class="[
                  enabledOverflow ? 'overflow-visible' : 'overflow-hidden',
                  props.wrapperClass ? props.wrapperClass : 'sm:max-w-xl',
                ]"
                class="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full"
              >
                <div
                  class="absolute w-full items-center justify-between right-0 top-0 px-4 pt-4 flex"
                >
                  <HeadlessDialogTitle
                    as="h3"
                    class="flex-1 text-base font-semibold leading-6 text-gray-900"
                    ><slot name="Heading" />
                  </HeadlessDialogTitle>

                  <button
                    type="button"
                    class="flex justify-center self-center p-1 hover:bg-gray-100 shrink-0 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-100 duration-100"
                    @click="open = false"
                  >
                    <span class="sr-only">Close</span>
                    <Icon name="ion:close-outline" class="text-xl" />
                  </button>
                </div>
                <slot name="content" />
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </ClientOnly>
</template>
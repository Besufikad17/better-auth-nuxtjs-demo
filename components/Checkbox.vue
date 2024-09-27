<script setup lang="ts">
    import { watch, ref } from "vue";
    import type { CheckboxItem } from "~/types/components";

    const emit = defineEmits(["update:modelValue"]);

    const props = defineProps({
        modelValue: {
            type: [String, Number, Boolean, Array],
            default: false,
        },
        data: {
            type: Object as PropType<CheckboxItem>,
        },
        hideDetails: Boolean,
        class: String,
        rules: String,
    });

    const checkbox = ref(props.modelValue);

    watch(
        () => checkbox.value,
        (newVal) => {
            emit("update:modelValue", newVal);
        }
    );
</script>

<template>
  <div>
    <div class="relative flex items-center">
      <div class="flex items-center h-5">
        <input v-model="checkbox" :value="data?.value" :id="data?.label" :name="data?.label" type="checkbox"
          class="focus:ring-primary text-primary border-primary rounded text-md" :class="props.class" />
      </div>
      <div class="ml-3 text-md">
        <label :for="data?.label" class="text-gray-900 dark:text-white cursor-pointer">
          {{ props.data?.label }}
        </label>
        <p v-if="!props.hideDetails && props.data?.description" id="name" class="text-gray-600 text-sm">
          {{ props.data?.description }}
        </p>
      </div>
    </div>
  </div>
</template>
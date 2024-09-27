<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps({
        modelValue: {
            type: [String, Number, Boolean, Array],
            default: undefined,
        },
        name: {
            type: String,
            default: undefined,
            required: true,
        },
        id: {
            type: String,
            default: undefined,
            required: false,
        },
        type: {
            type: String,
            default: "text",
            required: false,
        },
        placeholder: {
            type: String,
            default: undefined,
            required: false,
        },
        label: {
            type: String,
            default: undefined,
            required: false,
        },
        labelClass: {
            type: String,
            default: () => "",
            required: false,
        },
        hideDetail: {
            type: Boolean,
            default: false,
            required: false,
        },
        trailingIcon: {
            type: String,
            default: "",
            required: false,
        },
        leadingIcon: {
            type: [String],
            default: undefined,
            required: false,
        },
        leadingIconClass: {
            type: [String],
        },
        min: String,
        max: String,
        rules: {
            type: [String, Object],
            default: "",
            required: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        class: String,
        iconLeadingClass: String,
        placeholderStyle: String,
        iconBackground: Boolean,
        mainDiv: String,
    });

    const emit = defineEmits(["update:modelValue"]);

    const type = ref(props.type);
    const inputValue = ref(props.modelValue);
    const errorMessage = ref("");

    const set = (event: Event) => {
        const element = event.target as HTMLInputElement;
        emit("update:modelValue", element.value);
    };

    const togglePassword = () => {
        if (type.value === "password") {
            type.value = "text";
            return;
        }
        if (type.value === "text") {
            type.value = "password";
        }
    };

    watch(
        () => props.modelValue,
        (newVal) => {
            inputValue.value = newVal as string | number;
        }
    );
</script>

<template>
  <div :class="mainDiv">
    <div class="flex gap-x-1">
      <slot name="label"></slot>
    </div>
    <div class="relative flex rounded-lg font-body group">
      <slot name="leading" />
      <slot name="trailing" />
      <div class="flex-1 flex items-center relative">
        <client-only>
            <Icon :name="leadingIcon" class="absolute px-3" size="20" v-if="leadingIcon" :class="leadingIconClass" />
        </client-only>
        <input v-model="inputValue" @input="set($event)" @change="set($event)" :min="min" :max="max" :type="type"
          :name="props.name" step="any" :id="id" :class="[
            errorMessage
              ? 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-2 py-2.5 border-gray-300 group-hover:border-primary focus:border-none focus:ring-primary-500 ',
            props.iconLeadingClass ? props.iconLeadingClass : '',
            props.leadingIcon ? 'pl-10' : '',
            props.trailingIcon ? 'pr-0' : '',
            props.class ? props.class : '',
            props.placeholderStyle
              ? props.placeholderStyle
              : ' placeholder-gray-500',
            props.trailingIcon ? 'pr-7' : '',
            props.type == 'password' ? 'pr-7' : '',
          ]"
          class="block w-full rounded-md font-body text-base text-gray-500 placeholder-gray-500 focus:outline-none dark:bg-secondary-hover disabled:bg-gray-100 disabled:cursor-not-allowed"
          :placeholder="props.placeholder" aria-invalid="true" aria-describedby="email-error"
          :disabled="props.disabled" />

        <div v-if="props.type == 'password'"
          class="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer" @click="togglePassword()">
          <Icon class="h-5 w-5 text-gray-500"
            :name="type === 'password' ? 'lucide:eye-off' : 'lucide:eye'" size="25"></Icon>
        </div>
        <div v-else-if="trailingIcon && $slots.button"
          class="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer">
          <Icon class="text-gray-500" :name="props.trailingIcon" size="20"></Icon>
        </div>
      </div>
      <slot name="button" />
    </div>
    <p v-if="!hideDetail || errorMessage" class="col-span-5 font-body text-sm text-red-600 duration-300 transition-all"
      :class="errorMessage ? 'h-5 mt-1' : 'h-0'" id="email-error" :visible="errorMessage">
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>
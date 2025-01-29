<template>
    <div class="flex bg-primary px-3 rounded-md items-center">
        <Icon icon="mingcute:search-line" width="20" height="20"  style="color: #8B83BA" />
        <Input :id="label" :value="modelValue" 
        :type="type"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
        placeholder="Search Users by Name, Email or Date" 
        class="input-field" 
        v-bind="$attrs"
        />
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Props {
    type?: string
    modelValue: string
    placeholder?: string
    label?: string
}

defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
</script>
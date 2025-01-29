<template>
    <div>
        <button class="bg-purple py-[.4rem] px-[.6rem] rounded-md w-full text-white text-[1rem] font-medium">
            {{title}}
        </button>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    title: string;
};

defineProps<Props>()
</script>
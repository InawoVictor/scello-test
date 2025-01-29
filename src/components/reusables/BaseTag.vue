<template>
    <div class="flex items-center gap-x-2"
        :class="
            status === 'active' ? `active-tag` :
            status === 'inactive' ? 'inactive-tag' : 
            status === 'paid' ? 'paid-tag' : 
            status === 'unpaid' ? 'unpaid-tag' : 
            status === 'overdue' ? 'overdue-tag' : ''
        "
    >
        <div class="w-[6px] h-[6px] rounded-full"
            :class="
                status === 'inactive' ? 'bg-purpleDark' :
                status === 'active' ? 'bg-purpleBg' : 
                status === 'paid' ? 'bg-greenBg' : 
                status === 'unpaid' ? 'bg-yellowBg' : 
                status === 'overdue' ? 'bg-redBg' : ''
            "
        ></div>
        <span class="capitalize">{{ status }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps({
    status: {
        type: String,
        required: true
    },
})
</script>
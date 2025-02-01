<script setup>
defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    modelValue: {
        type: [String, Number],
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    }
});

defineEmits(['update:modelValue']);
    
</script>

<template>
    <div class="mb-4">
        <label :for="id" class="block text-md font-medium text-gray-700">{{ label }}</label>
        <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full px-3 py-2 my-3 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        :required="required"/>
    </div>
</template>
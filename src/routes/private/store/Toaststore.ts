import { writable } from "svelte/store";

export const toastStore = writable({
    show: false,
    type: 1,
    message: '',
    duration: 4000
});

export function triggerToast(type, message, duration) {
    toastStore.set({ show: true, type: type, message: message, duration: duration });
}
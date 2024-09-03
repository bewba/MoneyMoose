import { writable } from "svelte/store";

export const toastStore = writable({
    show: false,
    type: 1,
    message: '',
    duration: 4000
});

export function triggerToast(type: number, message: string, duration: number) {
    toastStore.set({ show: true, type, message, duration });
}

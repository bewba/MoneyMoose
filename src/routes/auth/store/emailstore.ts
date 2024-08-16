import { writable } from "svelte/store";

const currEmail = writable([
    {
        email: ""
    }
])

export default currEmail
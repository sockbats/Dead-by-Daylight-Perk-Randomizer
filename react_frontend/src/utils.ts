import backend_file from './json_data/backend.json';


export function get_backend_url() {
    if (!localStorage.getItem("backend")) {
        const backend = JSON.parse('{}')
        backend.host_address = backend_file.host_address
        backend.host_port = backend_file.host_port
        localStorage.setItem("backend", JSON.stringify(backend))
    }
    return JSON.parse(localStorage.getItem("backend") ?? JSON.stringify(backend_file))
}

export function set_backend_url(url: string) {
    const host = url.split(":")
    const backend = {
        host_address: host[0],
        host_port: host[1]
    }
    localStorage.setItem("backend", JSON.stringify(backend))
}

export function fetch_with_timeout(url: string, options = {}, timeout = 5000) {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchPromise = fetch(url, {...options, signal});

        const timeoutId = setTimeout(() => controller.abort(), timeout);

        return fetchPromise.finally(() => clearTimeout(timeoutId));
    }
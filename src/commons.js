function baseReponse(resource, response, status) {
    return {
        resource: resource,
        status: status === 200 ? "success" : "error",
        date: new Date(),
        data: response
    }
}

function baseViewOptions(options) {
    return {
        style: "style.css",
        title: "Develop",
        ...options
    }
}

export {
    baseReponse,
    baseViewOptions
}
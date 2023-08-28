function baseReponse(resource, response, status) {
    return {
        resource: resource,
        status: status === 200 ? "success" : "error",
        date: new Date(),
        data: response
    }
}


export {
    baseReponse
}
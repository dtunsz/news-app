export const fetcher = async (url, requestMethod = "GET", formData = null) => {
    const requestObject = {
        method: requestMethod,
    };
    if (formData !== null) {
        if (formData?.headers) {
            requestObject.headers = formData.headers;
        }
        if (formData?.body) {
            requestObject.body = JSON.stringify(formData.body);
        }
    }

    const refetch = fetch(url, {
        ...requestObject,
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });
    // .finally(() => setLoading(false));

    return refetch;
};

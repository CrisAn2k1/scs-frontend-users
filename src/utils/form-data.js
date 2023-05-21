import { isArray, isObject } from "lodash";
export const convertFormData = (rawData) => {
    const formData = new FormData();

    console.log(rawData);
    Object.entries(rawData).forEach(([key, value]) => {
        const isFile =
            value &&
            (value.hasOwnProperty("originFileObj") || value?.[0]?.hasOwnProperty("originFileObj"));
        // un-touched fields
        if (value === undefined) {
            return;
        }

        if (isFile) {
            if (isArray(value)) {
                value.forEach((val) => {
                    formData.append(key, val.originFileObj);
                });
            } else {
                formData.append(key, value.originFileObj);
            }
            return;
        } else if (isArray(value) || isObject(value)) {
            formData.append(key, JSON.stringify(value));
            return;
        } else {
            formData.append(key, value);
        }
    });

    return formData;
};

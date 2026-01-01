import { useState } from "react";

export function useForm({ initialValues, validate, onSubmit }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (key, value) => {
        setValues((p) => ({
            ...p,
            [key]: value,
        }));
    };

    const handleBlur = (key) => {
        setTouched((p) => ({
            ...p,
            [key]: true,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate ? validate(values) : {};
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onSubmit(values);
        }
    };

    const register = (key) => ({
        name: key,
        value: values[key] ?? "",
        onChange: (e) => handleChange(key, e.target.value),
        onBlur: () => handleBlur(key),
    });

    return {
        values,
        errors,
        touched,
        register,
        handleSubmit,
    };
}

import Joi from "joi";
import ClearIcon from "@mui/icons-material/Clear";
import { TextField } from "@mui/material";
import '../generalStyles.css'

function TextInput({
    label,
    error,
    handleInputState,
    handleErrorState,
    schema,
    size,
    ...rest
}) {
    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const inputSchema = Joi.object({ [name]: schema });
        const { error } = inputSchema.validate(obj);
        return error ? error.details[0].message : "";
    };

    const handleChange = ({ currentTarget: input }) => {
        if (schema) {
            const errorMessage = validateProperty(input);
            if (handleErrorState) handleErrorState(input.name, errorMessage);
        }
        handleInputState(input);
    };

    return (
        <div className="vertSpace">
            <p>{label}</p>
            <TextField
                {...rest}
                size={size}
                onChange={handleChange}
                className={
                    error ? "errorInput" : null
                }
            />
            {error && (
                <p className="errorMsg">
                    <ClearIcon /> {error}
                </p>
            )}
        </div>
    );
};

export default TextInput;
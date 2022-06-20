import { cleanEnv, str, port } from "envalid";

const validateEnv = () => {
    cleanEnv(process.env, {
        PORT: port(),
    });
};

export default validateEnv;

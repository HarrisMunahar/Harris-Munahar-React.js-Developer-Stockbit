import { createContext, useContext } from "react";

const MainContext = createContext(null);

const MainData = () => {
    const configData = useContext(MainContext);
    return  configData
}

export { MainContext, MainData};
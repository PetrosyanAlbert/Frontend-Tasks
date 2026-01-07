import { createContext } from "react";
import type { IContextType } from "./types";

export const UserContext = createContext<IContextType | undefined>(undefined);

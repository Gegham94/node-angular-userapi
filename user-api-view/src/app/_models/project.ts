import { User } from "./user";

export interface Project {
    id: string;
    title: string;
    manager: User;
    document: string;
    developer: User;
}
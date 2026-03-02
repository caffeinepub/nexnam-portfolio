import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    title: string;
    icon: string;
    description: string;
}
export interface Project {
    title: string;
    description: string;
    results: string;
    category: string;
    image: string;
}
export interface Contact {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Founder {
    bio: string;
    title: string;
    name: string;
    photo: string;
}
export interface backendInterface {
    addProject(title: string, description: string, category: string, image: string, results: string): Promise<void>;
    addService(title: string, description: string, icon: string): Promise<void>;
    authenticate(password: string): Promise<void>;
    deleteProject(title: string): Promise<void>;
    deleteService(title: string): Promise<void>;
    getAllProjects(): Promise<Array<Project>>;
    getAllServices(): Promise<Array<Service>>;
    getContacts(): Promise<Array<Contact>>;
    getFounder(): Promise<Founder>;
    getProject(title: string): Promise<Project | null>;
    getService(title: string): Promise<Service | null>;
    isAdminAuthenticated(): Promise<boolean>;
    submitContact(name: string, email: string, message: string): Promise<void>;
    updateFounder(name: string, title: string, bio: string, photo: string): Promise<void>;
    updateProject(title: string, description: string, category: string, image: string, results: string): Promise<void>;
    updateService(title: string, description: string, icon: string): Promise<void>;
}

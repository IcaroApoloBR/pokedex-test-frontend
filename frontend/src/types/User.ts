import { Pokemon } from "./Pokemon";

export interface User {
    token: string,
    email: string,
    id: string,
    name: string,
    created_at: string
    team?: Team;
}

export interface Team {
    id: string;
    name: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    user_id: string;
    pokemon: Pokemon[];
}
export interface Pokemon {
    id: number;
    name: string;
    img: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: [
        name: string,
    ];
    type: [
        name: string,
    ];
    status: StatusPoke;
}
export interface StatusPoke {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
}
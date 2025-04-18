export interface killer {
    killer_id: number,
    name: string,
    title: string,
    image: string
}

export interface killer_perk {
    perk_id: number,
    name: string,
    description: string,
    icon: string,
    killer_title: string,
    killer_id: number
}

export interface survivor {
    survivor_id: number,
    name: string,
    image: string
}

export interface survivor_perk {
    perk_id: number,
    name: string,
    description: string,
    icon: string,
    survivor_name: string,
    survivor_id: number
}
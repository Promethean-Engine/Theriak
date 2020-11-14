export type Epi = {
    id: number,
    text: string,
    positive?: number,
    negative?: number
}

export type EpiAbuse = {
    id: number,
    value: boolean
}

export type TrustPerson = {
    id: number,
    trustRate: number,
    name: string
}
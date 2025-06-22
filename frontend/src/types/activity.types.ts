export interface Activity {
    id: string;
    title: string;
    dest_id: string;
    price: number;
    description: string;
}

export interface AddActivityRequest {
    title: string;
    dest_id: string;
    price: number;
    description: string;
}

export interface UpdateActivityRequest {
    title?: string;
    dest_id?: string;
    price?: number;
    description?: string;
}


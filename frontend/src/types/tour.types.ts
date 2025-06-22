import { Destination } from "./destination.types";

export interface Tour {
    id: string;
    title: string;
    location: string;
    image?: string;
    duration: string;
    vacancy: number;
    capacity: number;
    price: number;
    start_date: string;
    description: string;
    destinations: Destination[];
}

export interface AddTourRequest {
    title: string;
    location: string;
    duration: string;
    vacancy: number;
    capacity: number;
    price: number;
    start_date: string;
    description: string;
}

export interface UpdateTourRequest {
    title?: string;
    location?: string;
    duration?: string;
    vacancy?: number;
    capacity?: number;
    price?: number;
    start_date?: string;
    description?: string;
}


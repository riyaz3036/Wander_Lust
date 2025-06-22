import { Activity } from "./activity.types";

export interface Destination {
    id: string;
    title: string;
    tour_id: string;
    image?: string;
    description: string;
    activities: Activity[]
}

export interface AddDestinationRequest {
    title: string;
    tour_id: string;
    description: string;
}

export interface UpdateDestinationRequest {
    title?: string;
    tour_id?: string;
    description?: string;
}


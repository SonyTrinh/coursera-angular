import { Comment } from './comment';

export class Dish{
    id : string;
    name: string;
    image: string;
    label: string;
    category: string;
    featured: boolean;
    price: string;
    description: string;
    comments: Comment[];
}
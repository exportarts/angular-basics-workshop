export interface User {
    address: Address;
    company: Company;
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
}

export interface Address {
    city: string;
    geo: GeoLocation;
    street: string;
    suite: string;
    zipcode: string;
}

export interface GeoLocation {
    lat: string;
    lng: string;
}

export interface Company {
    bs: string;
    catchPhrase: string;
    name: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

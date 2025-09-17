
export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  duration: number; 
  rating: number;
  genre: string;
}

export interface Showtime {
  time: string;
}

export interface Theater {
  name: string;
  showtimes: Showtime[];
}

export interface City {
  name: string;
  theaters: Theater[];
}

export interface Seat {
  id: string;
  status: 'available' | 'occupied' | 'selected';
}

export interface Booking {
  movie: Movie;
  city: string;
  theater: string;
  date: string;
  showtime: Showtime;
  seats: string[];
  totalPrice: number;
  bookingId?: string;
  bookingDate?: string;
}

export interface User {
  name: string;
  email: string;
}

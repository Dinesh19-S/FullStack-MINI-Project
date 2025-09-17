import { Movie, City, Showtime } from './types';

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Vettaiyan',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/u2T04CRv1MbsOaC0UHc9yI2k4sL.jpg',
    duration: 160,
    rating: 0.0,
    genre: 'Action/Drama'
  },
  {
    id: 2,
    title: 'Amaran',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/312QzOWu4lV512Q9g705z1fci0L.jpg',
    duration: 170,
    rating: 0.0,
    genre: 'Action/Biographical'
  },
  {
    id: 3,
    title: 'Viduthalai: Part 2',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/z8p2hYg3T45b3F1dRoa2x6M52A.jpg',
    duration: 165,
    rating: 0.0,
    genre: 'Crime/Drama'
  },
  {
    id: 4,
    title: 'Brother',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/24VODna6k9MX5sKzN1D5PqffbZ3.jpg',
    duration: 155,
    rating: 0.0,
    genre: 'Action/Comedy'
  },
  {
    id: 5,
    title: 'Sorgavaasal',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9qL327ov59dloiLDeDOo1Ckv3pn.jpg',
    duration: 180,
    rating: 0.0,
    genre: 'Action/Thriller'
  },
];

// FIX: Renamed standardShowtimes to SHOWTIMES, exported it, and gave it an explicit type.
export const SHOWTIMES: Showtime[] = [
  { time: '10:00 AM' },
  { time: '01:30 PM' },
  { time: '04:00 PM' },
  { time: '07:15 PM' },
  { time: '10:30 PM' },
];

export const CITIES: City[] = [
    {
        name: 'Chennai',
        theaters: [
            // FIX: Updated to use the exported SHOWTIMES constant.
            { name: 'PVR: Grand Galada', showtimes: SHOWTIMES },
            { name: 'Sathyam Cinemas', showtimes: [{ time: '11:00 AM' }, { time: '02:30 PM' }, { time: '06:00 PM' }, { time: '09:15 PM' }] },
            // FIX: Updated to use the exported SHOWTIMES constant.
            { name: 'INOX: Citi Centre', showtimes: SHOWTIMES },
            { name: 'AGS Cinemas: T. Nagar', showtimes: [{ time: '10:30 AM' }, { time: '01:45 PM' }, { time: '05:00 PM' }, { time: '08:30 PM' }] },
        ]
    },
    {
        name: 'Coimbatore',
        theaters: [
            // FIX: Updated to use the exported SHOWTIMES constant.
            { name: 'PVR: Brookefields', showtimes: SHOWTIMES },
            { name: 'INOX: Prozone Mall', showtimes: [{ time: '10:15 AM' }, { time: '01:30 PM' }, { time: '04:45 PM' }, { time: '08:00 PM' }, { time: '11:00 PM' }] },
            // FIX: Updated to use the exported SHOWTIMES constant.
            { name: 'Cinépolis: Fun Republic Mall', showtimes: SHOWTIMES },
            { name: 'KG Cinemas', showtimes: [{ time: '11:30 AM' }, { time: '02:45 PM' }, { time: '06:15 PM' }, { time: '09:30 PM' }] },
        ]
    },
    {
        name: 'Madurai',
        theaters: [
            // FIX: Updated to use the exported SHOWTIMES constant.
            { name: 'INOX: Vishaal De Mal', showtimes: SHOWTIMES },
            { name: 'Gopuram Cinemas', showtimes: [{ time: '10:45 AM' }, { time: '02:00 PM' }, { time: '05:15 PM' }, { time: '09:00 PM' }] },
            // FIX: Updated to use the exported SHOWTIMES constant.
            { name: 'Vetri Theatres', showtimes: SHOWTIMES },
        ]
    },
    {
        name: 'Tiruchirappalli (Trichy)',
        theaters: [
            // FIX: Updated to use the exported SHOWTIMES constant.
            { name: 'PVR: Femina Mall', showtimes: SHOWTIMES },
            { name: 'LA Cinema', showtimes: [{ time: '10:00 AM' }, { time: '01:15 PM' }, { time: '04:30 PM' }, { time: '07:45 PM' }] },
        ]
    },
    {
        name: 'Salem',
        theaters: [
            // FIX: Updated to use the exported SHOWTIMES constant.
            { name: 'INOX: Reliance Mall', showtimes: SHOWTIMES },
            { name: 'ARRS Multiplex', showtimes: [{ time: '11:00 AM' }, { time: '02:15 PM' }, { time: '05:30 PM' }, { time: '09:45 PM' }] },
        ]
    },
    {
        name: 'Tiruppur',
        theaters: [
            { name: 'Diamond Cinemas', showtimes: SHOWTIMES },
            { name: 'Sri Sakthi Cinemas', showtimes: [{ time: '10:45 AM' }, { time: '02:00 PM' }, { time: '05:15 PM' }, { time: '09:00 PM' }] },
        ]
    },
    {
        name: 'Erode',
        theaters: [
            { name: 'Sri Ganga Cinemas', showtimes: SHOWTIMES },
            { name: 'Erode Anna Cinemas', showtimes: [{ time: '11:00 AM' }, { time: '02:15 PM' }, { time: '05:30 PM' }, { time: '09:45 PM' }] },
        ]
    },
     {
        name: 'Tirunelveli',
        theaters: [
            { name: 'PVR: GK Cinemas', showtimes: SHOWTIMES },
            { name: 'Ram Muthuram Cinemas', showtimes: [{ time: '10:30 AM' }, { time: '01:45 PM' }, { time: '05:00 PM' }, { time: '08:30 PM' }] },
        ]
    },
    {
        name: 'Vellore',
        theaters: [
            { name: 'PVR: Velocity Mall', showtimes: SHOWTIMES },
            { name: 'AGS Cinemas Vellore', showtimes: [{ time: '11:15 AM' }, { time: '02:30 PM' }, { time: '05:45 PM' }, { time: '09:00 PM' }] },
        ]
    }
];


export const SEAT_PRICE_RUPEES = 250;
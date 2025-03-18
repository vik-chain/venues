export type Venue = {
  id: number
  name: string
  description: string
  capacity: string
  address: string
  upcomingShows: Array<{ name: string; date: string }>
  vibe: string
  imageUrl: string
}

export const venues: Venue[] = [
  {
    id: 1,
    name: "Madison Square Garden",
    description: "The world's most famous arena",
    capacity: "20,789",
    address: "4 Pennsylvania Plaza, New York, NY 10001",
    upcomingShows: [
      { name: "Billy Joel", date: "June 15, 2025" },
      { name: "The Weeknd", date: "July 3, 2025" },
      { name: "Coldplay", date: "July 20, 2025" },
    ],
    vibe: "Iconic, Energetic, Massive",
    imageUrl: "/images/msg.jpg",
  },
  // ... rest of the venues data
  {
    id: 2,
    name: "Radio City Music Hall",
    description: "Home of the Rockettes",
    capacity: "6,015",
    address: "1260 6th Ave, New York, NY 10020",
    upcomingShows: [
      { name: "Dave Chappelle", date: "May 25, 2025" },
      { name: "John Legend", date: "June 10, 2025" },
      { name: "Alicia Keys", date: "June 22, 2025" },
    ],
    vibe: "Historic, Elegant, Theatrical",
    imageUrl: "/images/radiocity.jpg",
  },
  {
    id: 3,
    name: "Brooklyn Steel",
    description: "Industrial-chic concert venue",
    capacity: "1,800",
    address: "319 Frost St, Brooklyn, NY 11222",
    upcomingShows: [
      { name: "Tame Impala", date: "May 30, 2025" },
      { name: "Glass Animals", date: "June 5, 2025" },
      { name: "Khruangbin", date: "June 18, 2025" },
    ],
    vibe: "Industrial, Intimate, Hip",
    imageUrl: "/images/brooklynsteel.jpg",
  },
  {
    id: 4,
    name: "Bowery Ballroom",
    description: "Intimate downtown music venue",
    capacity: "575",
    address: "6 Delancey St, New York, NY 10002",
    upcomingShows: [
      { name: "Japanese Breakfast", date: "May 22, 2025" },
      { name: "Mitski", date: "June 8, 2025" },
      { name: "Car Seat Headrest", date: "June 25, 2025" },
    ],
    vibe: "Intimate, Historic, Underground",
    imageUrl: "/images/boweryballroom.jpg",
  },
  {
    id: 5,
    name: "Apollo Theater",
    description: "Legendary Harlem landmark",
    capacity: "1,506",
    address: "253 W 125th St, New York, NY 10027",
    upcomingShows: [
      { name: "Amateur Night", date: "Every Wednesday" },
      { name: "D'Angelo", date: "June 12, 2025" },
      { name: "Lauryn Hill", date: "July 8, 2025" },
    ],
    vibe: "Historic, Soulful, Cultural",
    imageUrl: "/images/apollotheater.avif",
  },
] 
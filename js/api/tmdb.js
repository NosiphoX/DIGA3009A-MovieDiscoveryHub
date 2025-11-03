//mock data for testing
// js/api.js
export async function fetchTrendingMovies() {
  // Mock sample data for layout testing
  return [
    {
      id: 1,
      title: "Inception",
      release_date: "2010-07-16",
      vote_average: 8.8,
      overview: "A skilled thief who steals corporate secrets through dream-sharing technology is given a chance at redemption.",
      backdrop_path: "https://image.tmdb.org/t/p/w780/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      poster_path: "https://image.tmdb.org/t/p/w342/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      genre_ids: [28, 878, 53]
    },
    {
      id: 2,
      title: "La La Land",
      release_date: "2016-12-09",
      vote_average: 8.0,
      overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while balancing success and heartbreak.",
      backdrop_path: "https://image.tmdb.org/t/p/w780/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
      poster_path: "https://image.tmdb.org/t/p/w342/ylXCdC106IKiarftHkcacasaAcb.jpg",
      genre_ids: [10749, 10402]
    },
    {
      id: 3,
      title: "The Batman",
      release_date: "2022-03-04",
      vote_average: 7.8,
      overview: "Batman ventures into Gotham's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
      backdrop_path: "https://image.tmdb.org/t/p/w780/xHrp2pq73oi9D64xigPjWW1wcz1.jpg",
      poster_path: "https://image.tmdb.org/t/p/w342/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      genre_ids: [28, 80, 9648]
    }
  ];
}

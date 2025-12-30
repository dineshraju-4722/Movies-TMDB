import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        "Content-Type": "application/json",
        "Authorization":'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTkwZjMwMzc1ZGM4MmU2NzZjMGQ1NmI0MDgxN2U1ZiIsIm5iZiI6MTc2NjkyMDUyNy4yMDUsInN1YiI6IjY5NTExMTRmNTAwZGMzZjllMDdjNmY2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tsOuBAtdYnXUc-1LZRRPL-1QlO_ofple06q9-AJJgEY' ,
        "accept":"application/json",
    },
});

export default axiosInstance;
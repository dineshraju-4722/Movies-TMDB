import axiosInstance from "./axiosInstance"

export const GetPopularMovies=async (pageno)=>{
     const res= await axiosInstance.get(`movie/popular?language=en-US&page=${pageno}`);
     console.log(res.data);
     return res.data;
}
export const GetTopRatedMovies=async (pageno)=>{
     const res= await axiosInstance.get(`movie/top_rated?language=en-US&page=${pageno}`);
     console.log(res.data);
     return res.data;
}
export const GetUpcomingMovies=async (pageno)=>{
     const res= await axiosInstance.get(`movie/upcoming?language=en-US&page=${pageno}`);
     console.log(res.data);
     return res.data;
}
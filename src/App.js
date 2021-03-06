import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import WorldCards from "./components/world/worldcards";
import BusinessCards from "./components/science/sciencecards";
import MoviesCards from "./components/movies/moviescards";
import SportsCards from "./components/sports/sportscards";
import { fetchData } from "./components/api/apicall";
import { v4 as uuidv4 } from "uuid";
import LazyLoad from "react-lazy-load";
import { newsArray } from "./components/api/apicall";

function App() {
  /* World News */
  const [worldData, setWorldData] = useState([]);
  /* Sports News */
  const [sportData, setSportData] = useState([]);
  /* Science News */
  const [businessData, setBusinessData] = useState([]);
  /* Entertainment */
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // World
        const dataForWorld = await fetchData("world");
        const worldArticles = newsArray(dataForWorld);

        // Sports
        const dataForSports = await fetchData("sports");
        const sportsArticles = newsArray(dataForSports);

        // Science
        const dataForBusiness = await fetchData("business");
        const businessArticles = newsArray(dataForBusiness);

        //Movies
        const dataForMovies = await fetchData("movies");
        const moviesArticles = newsArray(dataForMovies);

        setWorldData(worldArticles);
        setSportData(sportsArticles);
        setBusinessData(businessArticles);
        setMoviesData(moviesArticles);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className='App'>
      <Navbar />
      <Banner />
      <div className='ml-0 lg:ml-4'>
        <div
          className=' p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex'
          role='alert'
        >
          <span className='flex rounded-full bg-indigo-600 uppercase px-2 py-1 text-xs font-bold mr-3'>
            New
          </span>
          <span className='font-semibold mr-2 text-left flex-auto'>World</span>
        </div>
      </div>
      <div className='world-wrapper'>
        {worldData !== [] &&
          worldData?.map((article) => (
            <LazyLoad key={uuidv4()}>
              <WorldCards key={uuidv4()} news={article} />
            </LazyLoad>
          ))}
      </div>
      <div className='ml-0 lg:ml-4'>
        <div
          className=' p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex'
          role='alert'
        >
          <span className='flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3'>
            New
          </span>
          <span className='font-semibold mr-2 text-left flex-auto'>Sports</span>
        </div>
      </div>
      <div className='sports-wrapper'>
        {sportData !== [] &&
          sportData?.map((article) => (
            <LazyLoad key={uuidv4()}>
              <SportsCards key={uuidv4()} news={article} />
            </LazyLoad>
          ))}
      </div>
      <div className='ml-0 lg:ml-4'>
        <div
          className='p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex'
          role='alert'
        >
          <span className='flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3'>
            New
          </span>
          <span className='font-semibold mr-2 text-left flex-auto'>
            Business
          </span>
        </div>
      </div>
      <div className='business-wrapper'>
        {businessData !== [] &&
          businessData?.map((article) => (
            <LazyLoad key={uuidv4()}>
              <BusinessCards key={uuidv4()} news={article} />
            </LazyLoad>
          ))}
      </div>
      <div className='ml-0 lg:ml-4'>
        <div
          className='p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex'
          role='alert'
        >
          <span className='flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3'>
            New
          </span>
          <span className='font-semibold mr-2 text-left flex-auto'>
            Box Office
          </span>
        </div>
      </div>
      <div className='movies-wrapper'>
        {moviesData !== [] &&
          moviesData?.map((article) => (
            <LazyLoad key={uuidv4()}>
              <MoviesCards key={uuidv4()} news={article} />
            </LazyLoad>
          ))}
      </div>
    </div>
  );
}

export default App;

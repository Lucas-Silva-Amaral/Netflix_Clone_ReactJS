import React, { useEffect, useState } from "react"
import "./App.css"
import Tmdb from "./Tmdb"
import { MovieRow } from "./components/MovieRow"
import { FeaturedMovie } from "./components/FeaturedMovie"
import { Header } from "./components/Header"

export const App = () => {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [darkHeader, setDarkHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      // Pegando o Featured
      let originals = list.filter((i) => i.slug === "originals")
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      )
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv")
      setFeaturedData(chosenInfo)
    }
    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setDarkHeader(true)
      } else {
        setDarkHeader(false)
      }
    }
    window.addEventListener("scroll", scrollListener)
    return () => {
      window.removeEventListener("scroll", scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header dark={darkHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        <p>
          Feito com{" "}
          <span role="img" arial-label="coracao">
            🧡
          </span>{" "}
          por Lucas Amaral{" "}
        </p>
        <p>Direitos de imagem para Netflix</p>
        <p>Dados pegos do site Themoviedb.org</p>
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://www.theodysseyonline.com/media-library/image.gif?width=400&coordinates=26%2C0%2C26%2C0&height=763.9639639639639&quality=80&id=17432915"
            alt="Loading"
          />
        </div>
      )}
    </div>
  )
}

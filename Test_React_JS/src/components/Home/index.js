import Aos from "aos"
import axios from "axios"
import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { MainData } from "../../config/context.config"
import { TitlePage } from "./title-page"
import 'aos/dist/aos.css';
import { Link } from "react-router-dom"
export const HomeComponent = () => {
    const [count, setCount] = useState(2)
    const [totalResult, setTotalResult] = useState(0)
    const [Movie, setMovie] = useState([])
    const { data } = MainData()
    const [isLoading, setIsLoading] = useState(false)
    const [isButton, setIsbutton] = useState(true)

    const onAdd = () => {
        let total = parseInt(totalResult)

        if (Movie.length === total) {
            setIsbutton(false)
            setCount(0)
            return false
        } else {
            setCount(count + 1)
        }
        axios.get(`http://www.omdbapi.com/?apikey=808986f1&s=${data.query}&type=${data.select}&page=${count}`).then((v) => {
            if (v.data.Search) {
                v.data.Search.map((v) => setMovie(d => [...d, v]))
            } else {
                setIsbutton(false)
            }
        })

    }
    useEffect(() => {
        Aos.init();
        setIsLoading(false)
        axios.get(`http://www.omdbapi.com/?apikey=808986f1&s=${data.query}&type=${data.select}&page=1`).then((v) => {
            setMovie(v.data.Search)
            setIsLoading(true)
            setTotalResult(v.data.totalResults ? v.data.totalResults : 0)
            let total = parseInt(v.data.totalResults)
            if (v.data.totalResults) {
                if (total === 0) {
                    setIsbutton(false)
                    setCount(0)
                } else {
                    setIsbutton(true)
                }
                setCount(2)
            }

        })


        return () => {
            setMovie([])
        }
    }, [data])

    const Search = Movie
    const filtered = !Search ? [] : [...new Map(Search.map(item => [item.imdbID, item])).values()]


    const Loading = () => (
        <div className="d-flex justify-content-between align-items-center py-3">
            <div id="loading-indicator text-center" style={{ margin: "auto", width: "40px", height: "40px" }} role="progressbar" className="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"><svg viewBox="22 22 44 44" className="MuiCircularProgress-svg">
                <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" className="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"></circle>
            </svg></div>
        </div>
    )
    return (
        <div className="bg-custom p-4">
            <TitlePage totalResult={totalResult}></TitlePage>
            {!isLoading ? <Loading></Loading> : Movie ? <>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 450: 2, 750: 3, 900: 4, 1200: 4 }}>
                    <Masonry gutter="10px">
                        {filtered.map((v, k) => {
                            let empty = v.Poster === "N/A" ? "./empty.png" : v.Poster
                            return (
                                <Link key={k} to={`/article/${v.imdbID}`}>
                                    <Card className="border-0 bg-transparent position-relative" data-aos="fade-up" id="content">
                                        <Card.Header className="position-absolute bg-transparent justify-content-between d-flex" style={{ top: 0, width: "100%", color: "white", borderBottom: 0 }}>
                                            <div className="btn btn-dark">
                                                {v.Type}
                                            </div>
                                            <div className="btn btn-dark">
                                                {v.Year}
                                            </div>
                                        </Card.Header>
                                        <Card.Body className="p-0">
                                            <Card.Img src={empty} style={{ height: "24rem" }}></Card.Img>
                                        </Card.Body>
                                        <Card.Footer className="position-absolute" style={{ bottom: 0, width: "100%", background: "rgb(38 39 39 / 86%)", color: "white", borderTop: 0 }}>
                                            {v.Title}
                                        </Card.Footer>
                                    </Card>
                                </Link>
                            )
                        }
                        )}
                    </Masonry>
                </ResponsiveMasonry>

                {isButton && <div className="text-center p-2 more" onClick={() => onAdd()}>
                    More Movie
                </div>}

            </>
                : <div className="text-center text-secondary py-2" style={{
                    fontSize: "18px",
                    background: "#212529"
                }}> Movie Not Found </div>
            }

        </div>
    )
}
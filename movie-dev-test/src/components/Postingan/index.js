import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import {
    useParams
} from "react-router-dom";
import { MainData } from "../../config/context.config";
import Empty from "../../empty.png"

export const Postingan = () => {
    let { topicId } = useParams();
    let { setData } = MainData()
    const [ isShow , setisShow] = useState(false)
const [isLoading, setIsLoading] = useState(false)

const [content, setContent] = useState(null)
useEffect(() => {
    setIsLoading(false)
    axios.get(`http://www.omdbapi.com/?apikey=808986f1&i=${topicId}&plot=full`).then((v) => {
        setContent(v.data)
        setIsLoading(true)
    })
    setData(d => ({
        ...d,
        id: topicId
    }))
}, [topicId, setData])


const Loading = () => (
    <div className="d-flex justify-content-between align-items-center py-3">
        <div id="loading-indicator text-center" style={{ margin: "auto", width: "40px", height: "40px" }} role="progressbar" className="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"><svg viewBox="22 22 44 44" className="MuiCircularProgress-svg">
            <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" className="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"></circle>
        </svg></div>
    </div>
)

const onShowImage = () => {
    setisShow(true)
}

return (
    <div className="bg-custom p-4">
        {!isLoading ? <Loading></Loading> : content && <Row>
            <div className="col-lg-4">
                <Card className="border-0 bg-transparent">
                    <Card.Body className="bg-transparent position-relative p-0">
                        <Card.Img src={content.Poster === "N/A" ? Empty : content.Poster}></Card.Img>
                        <div className="position-absolute w-100 h-100 image d-flex justify-content-center align-items-center" onClick={() => onShowImage()}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="64" height="64"
                                viewBox="0 0 172 172"
                                style={{ fill: "#000000" }}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g id="original-icon" fill="#cccccc"><path d="M10.32,17.2c-1.90232,0 -3.44,1.53768 -3.44,3.44v96.32c0,1.90232 1.53768,3.44 3.44,3.44h116.96c1.90232,0 3.44,-1.53768 3.44,-3.44v-96.32c0,-1.90232 -1.53768,-3.44 -3.44,-3.44zM13.76,24.08h110.08v57.05563l-18.20781,-18.20781c-1.29688,-1.29688 -3.3512,-1.3115 -4.70312,-0.1075l-25.61188,25.61187c-0.6708,0.6708 -1.55499,1.00781 -2.43219,1.00781c-0.8772,0 -1.76139,-0.33701 -2.43219,-1.00781c-1.34504,-1.34504 -1.34504,-3.51933 0,-4.86437l11.03219,-11.02547l-30.78531,-33.58703c-1.28656,-1.39664 -3.4543,-1.49796 -4.85094,-0.22172l-32.08875,29.16609zM103.2,34.4c-3.79972,0 -6.88,3.08028 -6.88,6.88c0,3.79972 3.08028,6.88 6.88,6.88c3.79972,0 6.88,-3.08028 6.88,-6.88c0,-3.79972 -3.08028,-6.88 -6.88,-6.88zM137.6,34.4v6.88h3.44v89.44h-110.08v-3.44h-6.88v6.88c0.00019,1.89978 1.54022,3.43981 3.44,3.44h116.96c1.89978,-0.00019 3.43981,-1.54022 3.44,-3.44v-96.32c-0.00019,-1.89978 -1.54022,-3.43981 -3.44,-3.44zM154.8,51.6v6.88h3.44v89.44h-110.08v-3.44h-6.88v6.88c0.00019,1.89978 1.54022,3.43981 3.44,3.44h116.96c1.89978,-0.00019 3.43981,-1.54022 3.44,-3.44v-96.32c-0.00019,-1.89978 -1.54022,-3.43981 -3.44,-3.44z"></path></g></g></svg>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-lg-8">
                <Card className="border-0 bg-transparent">
                    <Card.Body className="bg-transparent">
                        <Card.Title className="text-secondary">
                            <div className="d-flex justify-content-between mb-3">
                                <span className="px-3 py-2 bg-dark">
                                    {content.Type}
                                </span>
                                <span className="px-3 py-2 bg-dark">
                                    {content.Year}
                                </span>
                            </div>
                            <h3 className="border-bottom pb-2">
                                {content.Title}
                            </h3>
                            <div>
                                {content.Plot}
                            </div>
                            <br></br>
                            <div style={{
                                background: "#212529",
                                padding: "10px 15px",
                                lineHeight: "1.5",
                                borderRadius: "10px"
                            }}>
                                <div>
                                    Director: {content.Director}
                                </div>
                                <div>
                                    Actors: {content.Actors}
                                </div>
                                <div>
                                    Genre: {content.Genre}
                                </div>
                                <div>
                                    Released: {content.Released}
                                </div>
                                <div>
                                    Writer: {content.Writer}
                                </div>
                                <div>
                                    Language: {content.Language}
                                </div>
                                <div>
                                    Country: {content.Country}
                                </div>
                                <div className="px-3 py-2 border my-2 rounded-2">
                                    List Rating
                                    {content.Ratings.map((v, k) => <div key={k} className="d-flex justify-content-between">
                                        <div>
                                            Source : {v.Source}
                                        </div>
                                        <div>
                                            Rating : {v.Value}
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </Card.Title>
                    </Card.Body>
                </Card>
            </div>
            {isShow && <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center" id="poup" style={{
                left: 0,
                top: 0,
                zIndex: 9999999999
            }}>
                <div className="bg-shadow" onClick={() => setisShow(false)}></div>
                <Card>
                    <Card.Body>
                        <Card.Img src={content.Poster === "N/A" ? Empty : content.Poster}></Card.Img>
                    </Card.Body>
                </Card>

            </div>}

        </Row>}

    </div>
)
}
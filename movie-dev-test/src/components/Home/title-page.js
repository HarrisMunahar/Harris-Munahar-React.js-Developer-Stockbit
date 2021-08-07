import { useCallback } from "react"
import { Card, Row } from "react-bootstrap"
import { MainData } from "../../config/context.config"

export const TitlePage = (props) => {
    const { setData } = MainData()

    const onChange = useCallback(
        (e) => {
            setData(data => ({
                ...data,
                select: e.target.value === "" ? null : e.target.value
            }))
        },
        [setData],
    )
    
    return (
        <Card className="bg-transparent text-secondary pb-3 border-0">
            <Row>
                <div className="col-md-8">
                    <h4 className="m-0">
                        Movie List ({props.totalResult})
                    </h4>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <select className="form-control" onChange={(e) => onChange(e)}>
                            <option value="">Select Type Movie</option>
                            <option value="series">Series</option>
                            <option value="movie">Movie</option>
                            <option value="game">Game</option>
                        </select>
                    </div>
                </div>
            </Row>
        </Card>
    )
}
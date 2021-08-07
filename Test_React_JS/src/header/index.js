import axios from "axios"
import { useCallback, useEffect, useState } from "react"

import { Form, FormControl, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { MainData } from "../config/context.config"

export const MainHeader = () => {
    const { data, setData } = MainData()
    const [search, setSearch] = useState([])
    const [value, setValue] = useState('')
    let onChange = useCallback(
        (e) => {
            let v = e.target.value

            setData(data => ({
                ...data,
                query: v === '' ? null : v
            }))
            setValue(v)

            return () => {
                setData(d => ({
                    ...d,
                    id: null
                }))
            }

        },
        [setData],
    )

    useEffect(() => {
        console.log(data.id)
        if (data.id) {
            axios.get(`http://www.omdbapi.com/?apikey=808986f1&s=${value}&page=1`).then((v) => {
                setSearch(v.data.Search)
            })
        }

        return () => {
            setSearch([])
        }
    }, [value, data.id])


    return (
        <Navbar className="p-3 justify-content-between" collapseOnSelect bg="dark" variant="dark">
            <Navbar.Brand href="/">MovieClip</Navbar.Brand>
            <Form className="ml-auto relative">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => onChange(e)} />
                {search && <div className="text-secondary position-absolute right-0 searchview">
                    {search.map((v, k) => (
                        <div key={k}>
                            <Link to={`/article/${v.imdbID}`} className="text-secondary">
                                {v.Title}
                            </Link>
                        </div>
                    ))}
                </div>}

            </Form>
        </Navbar>
    )
}
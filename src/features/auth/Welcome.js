import { useSelector } from "react-redux";
import { selectCurrentToken , selectCurrentUser , selectCurrentRefreshToken } from "./authSlice";
import { Link } from "react-router-dom";
import React from 'react'

const Welcome = () => {
    const user=useSelector(selectCurrentUser)
    const token=useSelector(selectCurrentToken)
    const refreshToken=useSelector(selectCurrentRefreshToken)
    console.log()

    const welcome = user ? (<h1>Welcome {user.name}</h1>) :( <h1>Welcome</h1>)

    const tokenAbr=token
    const content = (
        <section className="welcome">
            {welcome}
            <p className="text-primary">accesToken: {token}</p><br/>
            <p className="text-secondary">refreshToken: {refreshToken}</p><br/>

        </section>
    )
    return content
}

export default Welcome
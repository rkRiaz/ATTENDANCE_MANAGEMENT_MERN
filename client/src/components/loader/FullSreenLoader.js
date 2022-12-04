import React from 'react'
import Loader from './loader'
import './Loader.css'

function FullScreenLoader() {
    return (
        <div className="fullScreenLoader">
            <Loader type="bars" color="red" />
        </div>
    )
}

export default FullScreenLoader

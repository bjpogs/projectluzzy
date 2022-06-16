import React from 'react'

const Notfound = () => {
    return (
        <div class="container">
            <h1>Error 404! Page not found.</h1>
            <button class="btn btn-primary" onClick={()=> window.location.href = '/'}>Back to Home</button>
        </div>
    )
}

export default Notfound
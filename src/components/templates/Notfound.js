import React from 'react'

const Notfound = () => {
    return (
        <div class="container">
            <h1>Your happiness is not here! find somewhere else you btch!</h1>
            <button class="btn btn-primary" onClick={()=> window.location.href = '/'}>Back to reality</button>
        </div>
    )
}

export default Notfound
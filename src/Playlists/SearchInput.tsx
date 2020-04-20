import React from 'react'

const SeacrhInput = (props: any) => {
    return (
        <div className="search show-results">
            <div className="search-container">
                <input
                    onChange={() => alert(1)}
                    type="search"
                    className="search-field"
                    name="search"
                    value={''}
                    id="search"
                    placeholder={'searchPlaceholder'}
                />
            </div>
        </div>
    )
}

export default SeacrhInput

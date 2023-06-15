import { useState } from 'react'

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleSearch = () => {
        console.log('Performing search for:', searchTerm)
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Enter your search term"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchComponent

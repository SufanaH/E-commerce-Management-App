import React, { ChangeEvent } from 'react'

type SearchingProps = {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const Searching = ({ searchTerm, handleSearch }: SearchingProps) => {
  return (
    <div>
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
    </div>
  )
}

export default Searching

import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom'
function Pokemon({name , image , id }) {
  return (
    <div className='pokemon'>
    <Link className='link' to={`/pokemon/${id}`}>
    <div className='pokemon-name'>{name}</div>
    <div > <img className='pokemon-img' src={image} alt="pokemon img" /></div>
    
    </Link>
    
    </div>
  )
}

export default Pokemon
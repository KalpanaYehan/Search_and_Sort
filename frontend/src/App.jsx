import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Posts } from './assets/Content'

function App() {
    const [list,setList] = useState(Posts)
    const [query,setQuery] = useState('')
    const [sortFeild,setSortFeild] = useState('title')
    const [sortBy,setSortBy] = useState('ascending')
    const [result,setResult] = useState()

    const handleChange = (e)=>{
      const results = Posts.filter((post)=>{
        if(e.target.value==="") return Posts;
        return post["title"].toLowerCase().includes(e.target.value.toLowerCase())
      })
     
      setResult(results)
      setQuery(e.target.value)
      setList(sortFun(results,sortBy,sortFeild))
    }
    const changeSortFeild = (feild)=>{
      setSortFeild(feild)
      setQuery(query)
      setList(!result ? sortFun(Posts,sortBy,feild) : sortFun(result,sortBy,feild))
    }
    const changeSortType = (type)=>{
      setSortBy(type)
      setQuery(query)
      setList(!result ? sortFun(Posts,type,sortFeild) : sortFun(result,type,sortFeild))
    }

    const sortFun = (result,sortby,sortfeild)=>{
      if(sortby ==='ascending') {
        result.sort((a,b)=>a[sortfeild]<b[sortfeild] ? -1:1)
      }
      else if(sortby==='descending'){
        result.sort((a,b)=>a[sortfeild]<b[sortfeild] ? 1:-1)
      }
      return result
    }

    return(
      <div>
        <form >
          <div>
            <span className='span'>Search</span>
            <input type="search" placeholder='search' onChange={handleChange}></input>
          </div>
          <div>
            <span className='span'>Sort Feild:</span>
            <select name='feild' onChange={(e)=>changeSortFeild(e.target.value)}>
              <option value='title'>None</option>
              <option value='title'>Title</option>
              <option value='description'>Description</option>
            </select>
          </div>
          <div>
            <span className='span'>Sort By:</span>
            <select name='type' onChange={(e)=>changeSortType(e.target.value)}>
              <option value='ascending'>None</option>
              <option value='ascending'>Ascending</option>
              <option value='descending'>Descending</option>
            </select>
          </div>
        </form>
        <div>
          {list.map((post)=>(
            <div className='card' key={post.title}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))}

          {list.length===0 && <h2>Empty List!</h2>}
        </div>
      </div>
    )
 
}

export default App

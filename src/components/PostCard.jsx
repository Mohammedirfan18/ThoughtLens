import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/storage'
import { useSelector } from 'react-redux'
import parse from "html-react-parser"


function PostCard({$id,title,featuredImage,content,userName}) {
  
  return (
    // <Link to={`/post/${$id}`}>
    //     <div className='w-[300px] h-[250px] bg-gray-700 text-gray-50 rounded-xl p-4 mx-1 my-2'>
    //         <div className='w-full mb-4 h-[80%]'>
    //             <img src={storageService.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-full w-full'/>
    //         </div>
    //         <h2
    //         className='text-xl font-bold'
    //         >{title}</h2>
    //     </div>
    // </Link>
    <Link to={`/post/${$id}`}>

    <div  className="max-w-sm mx-auto bg-gray-50 rounded overflow-hidden drop-shadow-md">
      <img
        src={storageService.getFilePreview(featuredImage)}
        alt={title}
        className="object-cover w-full h-44 bg-gray-500"
      />
      <div className="px-6 py-4">
      <h3 className="text-2xl font-semibold">{title}</h3>

         {/* <div class="font-bold text-xl mb-2 text-white"> {title}</div> */}
     

      <p className="overflow-hidden max-h-36">{parse(content)}</p>
      <p className="text-violet-700 hover:font-bold">Read more...</p>

      <div className="space-x-2 my-2">
      <span className="self-center text-sm text-violet-700 font-bold">By: &nbsp;{userName}</span>
     
      </div>

      </div>

    </div>

  </Link>
  )
}

export default PostCard
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {PostForm,Container} from "../components/index"
import databaseService from '../appwrite/database'

function EditPost() {
    const[post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        databaseService.getPost(slug).then((post)=>{
            if (post) {
                setPost(post)
            }
            else{
                navigate("/")
            }
        })
    },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost
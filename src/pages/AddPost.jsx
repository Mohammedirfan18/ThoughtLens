import React from 'react'
import { PostForm, Container } from "../components/index"


function AddPost() {
    return (
        <div className='py-8 mt-12 sm:mt-24'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost
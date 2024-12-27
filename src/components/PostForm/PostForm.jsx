import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Select, RTE } from '../index'
import { useSelector } from 'react-redux'
import databaseService from '../../appwrite/database'
import storageService from '../../appwrite/storage'

function PostForm({ post }) {
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
            if (file) {
                await storageService.deleteFile(post.featuredImage)
            }
            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : undefined
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await databaseService.createPost({
                    ...data,
                    userName: userData.name,
                    userId: userData.$id,
                    
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                 .trim()
                 .toLocaleLowerCase()
                 .replace(/[^a-zA-z\d]+/g, "-")
        }
        else {
            return ""
        }
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full sm:w-2/3 sm:px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-gray-700 text-gray-50"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-gray-700 text-gray-50"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Input
                    label="Featured Image :"
                    type="file"
                    labelstyle="sm:hidden"
                    className="sm:hidden mb-4 bg-gray-700 text-gray-50"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="sm:hidden w-full mb-4">
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full sm:w-1/3 sm:px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    labelstyle="hidden sm:block"
                    className="hidden sm:block mb-4 bg-gray-700 text-gray-50"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="hidden sm:block w-full mb-4">
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mt-3 sm:mt-0 mb-4 bg-gray-700 text-gray-50"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
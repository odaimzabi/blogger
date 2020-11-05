
import React, { useRef } from 'react'
import {useRouter} from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import Layout from '../../components/Layout'
import { Box, Button, Flex, Heading,Spinner,Text, Textarea,useToast } from '@chakra-ui/core'
import {  useFetchPostQuery, usePostCommentMutation } from '../../generated/generated'
interface Props {
    
}


 const Post = (props: Props) => {

   //router params & toast
    const router=useRouter()
    const postId=parseInt(router.query.id as string)
    const toast=useToast()
    //post fetching
   const [{data,fetching}]=useFetchPostQuery({variables:{postId}})
   
   // for textarea
   const [,post]=usePostCommentMutation()
   const text=useRef<HTMLTextAreaElement>(null)

   console.log(data,fetching)

  async function postComment(e:any){
         e.preventDefault()
        const details=text.current?.value as string
        const blogId=data?.fetchPost?.blogId as number
        const postId=parseInt(data?.fetchPost?.id as string)
        const res=await post({details,blogId,postId})
        if (!res.error){
            toast({
               position: "top-right",
               title: "Comment Created.",
               description: "Comment has been submitted!",
               status: "success",
               duration: 3000,
               isClosable: true,
             })
        }
  }

    return (
        
       <Layout title="View Post">
            {!data?
            <Flex alignItems="center" justifyContent="center" mt={12}  transform="translate(-50%,-50%)" position="absolute" top="30%" left="50%" direction="column">
            <Spinner thickness="4px"
  speed="0.65s"
  emptyColor="gray.200"
  color="blue.500"
  size="xl"/>
  </Flex>:(<Flex alignItems="center" justifyContent="center" mt={12}  transform="translate(-50%,-50%)" position="absolute" top="30%" left="50%" direction="column">
                  <Box px={16}>
                  <Heading as="h2" size="xl" isTruncated>
                     {data?.fetchPost?.title}
                  </Heading>
                  <Text fontSize="md" ml="auto">
                     Posted By {data?.fetchPost?.userId}
                  </Text>
                  <Text fontSize="lg" mt={14}>
                     {data?.fetchPost?.details}
                  </Text>

                  </Box>

                  <Box mt={12}>
                  <Text fontSize="md" mb={2}>Post a Comment:</Text>
                  <Textarea  size="lg" px={20} ref={text} />
                  <Button variantColor="blue"  type="submit" mt={8} onClick={(e)=>postComment(e)}>Post</Button>
                  </Box>
            </Flex>
         )}
       </Layout> 
            
       
    )
}

export default withUrqlClient(createUrqlClient,{ssr:true}) (Post)

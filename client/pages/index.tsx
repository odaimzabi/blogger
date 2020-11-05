import Layout from '../components/Layout'
import styles from '../styles/home.module.css'
import React from 'react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import {usePostsQuery } from '../generated/generated'
import {Box, Divider, Flex, Heading, Spinner,Stack,Text} from '@chakra-ui/core'
import VoteSection from '../components/VoteSection'
import Link from 'next/link'
interface Props {
  
}

const index = (props: Props) => {

  const [{data,fetching}]=usePostsQuery({variables:{blogId:2}})

  if (!data && !fetching) return <h1>Something happened...</h1>
  console.log(data)
  return (
    
  <Layout title="Index Page">
     
     <div className={styles.container}>
          {!data?<Spinner thickness="4px"
  speed="0.65s"
  emptyColor="gray.200"
  color="blue.500"
  size="xl"/>:(
  <Stack spacing={8} overflow="visible">
  {data?.fetchPosts?.map((item)=>{
            
              return (
                <div key={item.id}>
            
            <Flex direction="column" shadow="md" borderWidth="1px"  p={4} mt={4} >
            <Box mb={4} mt={4} px={3}>
            
            <Link href="/post/[id]" as={`/post/${item.id}`}>
            <Heading as="h2" size="xl" isTruncated>
                  {item.title} 
            </Heading>
            </Link>
            <Text fontSize="md">
                {item.details}
            </Text>
            <Divider/>
            <VoteSection post={item}/>
            </Box>
            </Flex>
            
            </div>
              )
              
          })}
          </Stack>
  )}
     </div>
        

   </Layout>
 
  )
}

export default  withUrqlClient(createUrqlClient,{ssr:true}) (index)


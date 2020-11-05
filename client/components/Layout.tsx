import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useLogoutMutation, useMeQuery } from '../generated/generated'
import styles from '../styles/layout.module.css'
import { Box, Button, Flex } from '@chakra-ui/core'
type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const isServer=()=>typeof window==="undefined" 
  const [{data,fetching}]=useMeQuery({pause:isServer()})
  const [{fetching:isLogout},logout]=useLogoutMutation()
  let body=null 

  if (fetching){

  }else if (!data?.me){
    body=(
      <>
      <li><Link href="/login">Login</Link></li>
      <li><Link href="/register">Register</Link></li>
      </>
    )
  }else {
    body=(
      <>
     <li><span>{data?.me.username}</span></li> 
     <li><Button
          variant="link"
          onClick={async ()=>await logout()}
          isLoading={isLogout}
        >
        Logout  
        </Button>
        </li>
      </>
    )
  }
  return (
  <div >
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className={styles.navbar}>

        <Link href="/">Home</Link>
        
        <ul>
          {body}
        </ul>
      </nav>
    </header>

    <Flex alignItems="center">
    {children}
      </Flex>
  </div>
)

}
export default Layout

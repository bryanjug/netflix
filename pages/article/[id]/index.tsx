import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import {server} from '../../../config'
import Link from 'next/link'
import Meta from '../../../components/Meta'
// import {useRouter} from 'next/router'

interface ArticleProps {
    article: {
        title: string;
        excerpt: string;
        body: string;
    }
}

const article:React.FC<ArticleProps> = ({article}) => {
    // const router = useRouter()
    // const {id} = router.query

    return (
        <div>
            <Meta title={article.title} description={article.excerpt}/>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br/>
            <Link href='/'>Go Back</Link>
        </div>
    )
}

//static
//static is good for websites using no data fetching
//loads HTML after data is fetched
export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(`${server}/api/articles/${context.params.id}`)

    const article = await res.json()

    return {
        props: {
            article
        }
        //,revalidate: 60 seconds
        //incremental static regeneration is used for fetching data after 60
        //seconds to update stale / old data
    }
}

//used for moving ids to different pages / routes
export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${server}/api/articles`)

    const articles = await res.json()

    const ids = articles.map(article => article.id)

    const paths = ids.map(id => (
        {
            params: {
                id: id.toString()
            }
        })
    )

    return {
        paths, 
        fallback: false
    }
}

//static
// export const getStaticProps: GetStaticProps = async (context) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

//     const article = await res.json()

//     return {
//         props: {
//             article
//         }
//     }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`)

//     const articles = await res.json()

//     const ids = articles.map(article => article.id)

//     const paths = ids.map(id => (
//         {
//             params: {
//                 id: id.toString()
//             }
//         })
//     )

//     return {
//         paths, 
//         fallback: false
//     }
// }

//server
//HTML is generated on each request
//on each request, data is fetched and HTML is generated
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
//     const article = await res.json()

//     return {
//         props: {
//             article
//         }
//     }
// }

//jsx
// return (
//     <>
//         <h1>{article.title}</h1>
//         <p>{article.body}</p>
//         <br />
//         <Link href='/'></Link>
//     </>
// )

//static generation without data + fetch data on client side
//pre-render without data and then load data on client
//statically generates parts of the page that do not require external data
//populates remaining parts using external data
//good for pre-rendering loading state
// import useSWR from 'swr'
// function Profile() {
//     const {data, error} = useSWR('/api/user', fetcher)

//     if (error) return <div>failed to load</div>
//     if (!data) return <div>loading...</div>
//     return <div>Hello {data.name}!</div>
// }

//you can choose any rendering method for each page
//when to use different methods:
//1. static rendering for home page, blog posts, or ecommerce product pages
//2. server rendering for facebook news feed where content is very dynamic and 
//needs to be updated on every request

export default article

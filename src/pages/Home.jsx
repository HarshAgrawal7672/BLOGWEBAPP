import React,{useEffect,useState} from "react"
import appwriteservice from "../appwrite/config"
import {Container,Postcard} from "../components"
function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
      appwriteservice.getAllPosts().then((posts)=>{
        if(posts){
          setPosts(posts.documents)
        }
      })
  },[])
  
  if(posts.length === 0){
    return <Container>No posts found</Container>
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map(post =>(
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>

      </Container>
    </div>
  )
    
}

export default Home

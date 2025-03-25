import React,{useEffect,useState} from 'react'
import { Container,Postform } from '../components'
import appwriteservice from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function Editpost() {
    const [post,setPosts] = useState(null)
    const{slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteservice.getpost(slug)
            .then(post=>{
                if(post){
                    console.log("✅ Post data fetched:", post);  // 🔎 Inspect post data

                    setPosts(post)
                }
            })
        }else{
            navigate('/')
        }

    },[slug,navigate])
  return post ?(
    <div className='py-8'>
        <Container>
            <Postform post={post} />
        </Container>
    </div>
  ) : null
}

export default Editpost

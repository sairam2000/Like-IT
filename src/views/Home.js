import {React,useContext,useEffect,useState} from 'react';
import {Usercontest} from '../App'

const Home = ()=>{
    const [data,setData] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem('jwt')
        fetch('/posts/all',{
            method:'get',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-Type':'application/json'
            }
        }).then(res=>res.json()).then(posts => setData(posts.posts))
    },[]);
    // console.log(data);
    

    const like = (id)=>{
        const token = localStorage.getItem('jwt')
        fetch('/posts/like',{
            method:"put",
            headers:{
                "Authorization":"Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postid : id
            })
        }).then(res=>res.json()).then(
            result=>{
                const newdata = data.map(item=>{
                    if(item._id === result._id){
                        return result
                    }
                    else{
                        return item
                    }
                });
                // console.log(newdata)
                setData(newdata);
            }
        );
    }

    const unlike = (id)=>{
        const token = localStorage.getItem('jwt')
        fetch('/posts/unlike',{
            method:"put",
            headers:{
                "Authorization":"Bearer "+token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postid : id
            })
        }).then(res=>res.json()).then(
            result=>{
                const newdata = data.map(item=>{
                    if(item._id == result._id){
                        return result
                    }
                    else{
                        return item
                    }
                });
                // console.log(newdata)
                setData(newdata);
            }
        );
    }

    const addcomment=(postid, text)=>{
        fetch('/posts/comment',{
            method:'put',
            headers:{
                'Authorization': "Bearer "+ localStorage.getItem('jwt'),
                'Content-Type':"application/json",
            },
            body: JSON.stringify({
                text,
                postid
            })
        }).then(res=>res.json()).then(result=>{
            const newdata = data.map((element)=>{
                if(element._id==result._id){
                    return result
                }
                else{
                    return element
                }
            })
            setData(newdata);
        })
    }

    const deletePost =(postid)=>{
        fetch(`/posts/delete/${postid}`,{
            method:'delete',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('jwt'),
                'Content-Type':'application/json'
            },
        }).then(res=>res.json()).then(result=>{
            const newdata = data.filter(item=>{
                return item._id != result._id
            })
            setData(newdata)
        }).catch(err=>console.log(err));
        
    }

    const {state, dispatch} = useContext(Usercontest);
    return(
        
        <div style={{padding:20}}>
            {
                
                data.map(item=>{
                  return(  <div className="card post-card" style={
                      { marginBottom:20}
                  }>
                <h5>{item.postedby.name} {(item.postedby._id === state._id)&&<i  className="material-icons right" onClick={()=>{deletePost(item._id)}} style={{cursor:"pointer",color:"red"}}>delete</i>}</h5>
                <div className="card-image">
                <img src={item.photo}
                alt=""/>
                </div>
                <div className="card-content">
                <i style={{color:"red"}} className="material-icons">favorite</i>
                
                  {  (!item.likes.includes(state._id))?
                         <i className="material-icons" onClick={()=>like(item._id)} style={{cursor: "pointer"}}>thumb_up</i>:
                  
                         <i className="material-icons" onClick={()=>unlike(item._id)} style={{cursor: "pointer"}}>thumb_down</i>
                    }
            
               
               
                    <h6>
                        {item.likes.length}
                    </h6>
                    <h6>
                        {item.title}
                    </h6>
                    <p>
                        {item.body}
                    </p>
                    {
                        item.comments.map(comment=>{
                           return  <h6><span style={{fontWeight:500}}>{comment.postedby.name}</span> <span>{comment.text}</span></h6>
                        })
                    }
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        addcomment(item._id,e.target[0].value)
                        e.target[0].value=""
                    }}>
                    <input
                    type="text"
                    placeholder="enter the comment" 
                    />
                    </form>
                </div>

            </div>)
                })
            }
             
           
        </div>
    );
}

export default Home;
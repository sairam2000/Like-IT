import React,{useState , useEffect} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

const CreatePost = ()=>{
    const [title,setTitle]= useState("");
    const [body,setBody] = useState("");
    const [image,setImage] = useState("");
    const [img_url,setUrl]= useState("");
    const history = useHistory();

    useEffect(()=>{
        if(img_url!==""){
            fetch('/posts/create',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:img_url
                })
            }).then(res=>res.json()).then(data=>{
                // console.log(data)
                if(data.error){
                    M.toast({html:data.error, classes:"#b71c1c red darken-4"})
                }
                else{
                    M.toast({html:data.msg, classes:"#388e3c green darken-2"});
                    history.push('/');
                }
            }).catch(err=>console.log(err))
        }

    },[img_url,body,history,title])

    const postDetails = ()=>{
        // if(!img_url){
        //     M.toast({html:"upload an image", classes:"#b71c1c red darken-4"})
        // }
        // else{
        const data =new FormData();
        data.append('file',image);
        data.append('upload_preset','insta_clone');
        data.append('cloud_name','sairam2000');

        fetch('https://api.cloudinary.com/v1_1/sairam2000/image/upload',{
            method:'post',
            body:data
        }).then(res=>res.json()).then(data=>{
            setUrl(data.url);
            
        })
        .catch(err=>console.log(err));

        
    // }
    }

    return(
        <div>
            <div className="card input-filling">
                <h4>CreatePost</h4>
                <div>
                <input
                type="text"
                placeholder="title"
                value = {title}
                onChange = {e=>{setTitle(e.target.value)}}
                />
                <input
                type="text"
                placeholder="body"
                value = {body}
                onChange = {e=>{setBody(e.target.value)}}
                />
                </div>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={e=>{setImage(e.target.files[0])}} multiple/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    
                </div>
                <button className="waves-effect waves-light btn button" onClick={()=>postDetails()}>Create</button>

            </div>
        </div>
    )
}

export default CreatePost;
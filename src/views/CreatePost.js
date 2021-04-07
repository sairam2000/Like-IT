import React from 'react';

const CreatePost = ()=>{
    return(
        <div>
            <div className="card input-filling">
                <h4>CreatePost</h4>
                <div>
                <input
                type="text"
                placeholder="title"
                />
                <input
                type="text"
                placeholder="body"
                />
                </div>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" multiple/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    
                </div>
                <button className="waves-effect waves-light btn button">Create</button>

            </div>
        </div>
    )
}

export default CreatePost;
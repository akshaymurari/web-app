import React from 'react'

const BlogCards = (props) => {
    return (
        <div className="card shadow QueryQuestionsHover text-white text-center mt-4 p-4" style={{ background:(props.type==="teacher")?"#db3d6a":"#3ddbd9", borderRadius: "50px" }}>
            <blockquote class="blockquote mb-0">
                <h3 style={{ textTransform: "uppercase" }}>{props.title}</h3>
                <p>{props.description}</p>
                <footer class="blockquote-footer text-white">
                    <small>
                        posted by {props.posted_by} <cite title="Source Title">posted on {props.posted_on}</cite>
                    </small>
                </footer>
            </blockquote>
        </div>
    )
}

export default BlogCards

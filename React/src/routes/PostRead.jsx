import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const PostRead = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    let [post,setPost] = useState({
        id: id,
        title: '',
        body: '',
        writer: '',
        wdate: ''
    })

    const {title, body, writer, wdate} = post

    const callAPI = async() => {
        let result = await axios.get(`/posts/read/${id}`)
        console.log(result.data);
        setPost(result.data)
    }

    useEffect(()=>{
        callAPI();
        console.log(post);
    },[])

    const postDelete = async () => {
        if(window.confirm(`${id}번 게시물을 삭제하시겠습니까?`)){
            await axios.post(`/posts/delete/${id}`)
            navigate('/posts')
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3 className='my-5'>게시글 정보</h3>

                    <Card className="text-start">
                        <Card.Header>[{id}] {title}</Card.Header>
                        <Card.Body>
                            {body}
                        </Card.Body>
                        <Card.Footer className="text-muted">Created on {wdate.slice(0,10)} by {writer}</Card.Footer>
                    </Card>

                    
                    {
                        writer === 'red' &&
                        <div className="text-end mt-3">
                            <Button className='btn-sm me-2' onClick={()=>{
                                navigate(`/posts/update/${id}`)
                            }}>수정</Button>
                            <Button variant='danger' className='btn-sm' onClick={postDelete}>삭제</Button>
                        </div>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default PostRead
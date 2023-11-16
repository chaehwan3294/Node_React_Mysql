import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const PostUpdate = () => {

    const navigator = useNavigate()

    const {id} = useParams()
    let [form, setForm] = useState({
        id:'',
        title:'',
        body:''
    })

    const {title, body} = form

    const callAPI = async()=>{
         let result = await axios.get(`/posts/read/${id}`)        
       setForm(result.data)
    }

    useEffect(()=>{
        callAPI()
    },[])

    const changeForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const update = async()=>{
        if(title===''){
            alert('제목을 입력해주세요.')
        }else if(body===''){
            alert('내용을 입력해주세요.')
        }else{
        await axios.post('/posts/update', form)
        alert('글이 수정되었습니다.')
        navigator(-1)
    }
    }

  return (
    <Container>
        <Row>
            <Col>
                <h3 className='my-5'>게시글 수정</h3>

                <Form>
                      <Form.Control className='my-3'  name='title' value={title} onChange={changeForm} placeholder='제목을 입력하세요' />
                      <Form.Control as='textarea' rows={10} value={body} onChange={changeForm} name='body' placeholder='내용을 입력하세요' />
                      
                      <div className='text-end mt-3'>
                        <Button className='btn-sm me-2'onClick={update}>수정</Button>
                        <Button className='btn-sm' variant='secondary' type='reset'>취소</Button>
                      </div>
                  </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default PostUpdate
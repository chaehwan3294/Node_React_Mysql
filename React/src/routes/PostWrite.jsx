import axios from 'axios'
import React, {useState} from 'react'
import { Col, Form, Row, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PostWrite = () => {
    let navigate=useNavigate()
    let [form, setForm]=useState({
        title:'',
        body:'',
        writer:'red'
    })

    const {title,body,write}=form
    
    const changeForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const insert =async()=>{
        if(title===''){
            alert('제목을 입력하세요.')
        } else if(body===''){
            alert('내용을 입력하세요.')
        } else {
            await axios.post('/posts/insert',form)
            alert('새로운 글이 등록 되었습니다.')
            navigate('/posts')
        }
    }
  return (
      <Container>
          <Row>
              <Col>
                  <h3 className='my-5'>게시글 등록</h3>

                  <Form>
                      <Form.Control className='my-3' onChange={changeForm} name='title' value={title} placeholder='제목을 입력하세요' />
                      <Form.Control as='textarea' rows={10} onChange={changeForm} name='body' value={body} placeholder='내용을 입력하세요' />
                      
                      <div className='text-end mt-3'>
                        <Button className='btn-sm me-2' onClick={insert}>등록</Button>
                        <Button className='btn-sm' variant='secondary' type='reset'>취소</Button>
                      </div>
                  </Form>
              </Col>
          </Row>
      </Container>
  )
}

export default PostWrite
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container, Row, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PostList = () => {

    let [posts, setPosts]=useState([])
    let [loading, setLoading]=useState(false);
    let [page, setpage]=useState(1);
    let [lastPage, setLastPage]=useState(1);

    const callAPI = async()=>{
        setLoading(true)
        const result = await axios.get(`/posts?page=${page}`);
        console.log(result.data);
        setPosts(result.data)

        const total = await axios.get('/posts/total')
        setLastPage(Math.ceil(total.data.total/5))

        setLoading(false)
    }

    useEffect(()=> {
        callAPI();
        console.log(posts)
    },[page])

    if(loading) return <h1>로딩중입니다.</h1>

  return (

        <Container>
          <Row>
              <Col>
                <h3 className='my-5'>게시글 목록</h3>
                <div className="text-end mb-3">
                  <Link to={'/posts/write'}>
                  <Button className='btn-sm'>글쓰기</Button>
                  </Link>
                </div>
                  <Table>
                    <thead>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Writer</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                          {posts.map((post, i) =>
                        <tr key={i}>
                            <td>{post.id}</td>
                            <td><Link to={`/posts/read/${post.id}`}>{post.title}</Link></td>
                            <td>{post.writer}</td>
                            <td>{post.wdate.substr(0,10)}</td>
                        </tr>
                        )}
                    </tbody>
                  </Table>

                  <div>
                    <Button disabled={page===1} onClick={()=>{
                        setpage(page-1)
                    }}>이전</Button>
                    <span className='mx-3'>{page}</span>
                    <Button disabled={page===(lastPage)} onClick={()=>{
                        setpage(page+1)
                    }}>다음</Button>
                  </div>
              </Col>
          </Row>
        
          <ul>

          </ul>
        </Container>
  )
}

export default PostList
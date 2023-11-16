import logo from './logo.svg';
import './App.css';
import Home from './routes/Home';
import PostList from './routes/PostList';
import PostWrite from './routes/PostWrite';
import { Route, Routes } from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap'
import PostRead from './routes/PostRead';
import PostUpdate from './routes/PostUpdate';

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">React 게시판</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/posts">게시글</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<PostList />} />
        <Route path='/posts/write' element={<PostWrite />} />
        <Route path='/posts/read/:id' element={<PostRead />} />
        <Route path='/posts/update/:id' element={<PostUpdate />} />
      </Routes>
    </div>
  );
}

export default App;

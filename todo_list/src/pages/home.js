import React, { useState } from "react";
import "../style/home.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodos } from "../features/todoSlice";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function modalOpen(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      // centered
    >
      <Modal.Header closeButton>
        <Modal.title id="contained-modal-title-vcenter">
          Modal Heading
        </Modal.title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const Home = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [currentPage, setCurrentPage] = useState();
  const [modalShow, setModalShow] = useState(false);
  const user = localStorage.getItem("user");
  const allPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const getList = () => {
    dispatch(getTodos(page))
      .unwrap()
      .then((data) => {
        setList(data);
      });
  };
  useEffect(() => {
    getList();
  }, [page]);

  return (
    <div className="main">
      <div className="container">
        <div className="navBar">
          {/* <div className="navWrapper"> */}
          <div className="profile">
            <h4>Hello {user}!</h4>
          </div>
          <div className="logOut">
            <Link to="/">
              <button className="btn primary btn-light" id="buttonLogOut">
                Logout
              </button>
            </Link>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center mt-3">
        <h1>Your To Do List!!</h1>
      </div>
      <hr className="hrMid"></hr>
      {list ? (
        <div className="container">
          <div className="navigation">
            <div className="createTodo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </div>
            <div className="pagination">
              <div className="previouPrev">
                <button
                  className="btn btn-secondary"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  Prev
                </button>
              </div>
              <div className="currentP">
                <button className="btn btn-light">{page}</button>
              </div>
              <div className="nextPrev">
                <button
                  className="btn btn-secondary"
                  disabled={page >= allPage.length}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="container">
        <div className="boxWrapper">
          {list.map((each) => {
            return (
              <>
                <div className="list">
                  <div className="upper">
                    <div className="id">
                      <h5>{each.id}.</h5>
                    </div>
                    <div className="head">
                      <h5>{each.title}</h5>
                    </div>
                  </div>
                  <div className="lineB">
                    <hr></hr>
                  </div>
                  <div className="status">
                    <h6>{each.completed ? "Done" : "Not Done"}</h6>
                    <input
                      type="checkbox"
                      className="inputCB"
                      checked={each.completed}
                    ></input>
                    <div className="deleteChange">
                      <div className="change">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                      </div>
                      <div className="delete">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <modalOpen
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

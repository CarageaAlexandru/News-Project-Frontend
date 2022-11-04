import { React, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const DeleteModal = ({ comment, handleDelete }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Delete comment
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm delete</Modal.Title>
				</Modal.Header>
				<Modal.Body>{comment.body}</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={() => handleDelete(comment.comment_id)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DeleteModal;

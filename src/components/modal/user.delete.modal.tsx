import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteUser, resetDelete } from "../../redux/user/user.slide";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserDeleteModal = (props: any) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const { isDeleteUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    dispatch(deleteUser({ id: dataUser?.id }));
  };
  useEffect(() => {
    setIsOpenDeleteModal(false);
    dispatch(resetDelete());
    toast("delete success");
  }, [isDeleteUser]);
  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => setIsOpenDeleteModal(false)}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;

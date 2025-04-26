import {Button, Form, Modal} from "react-bootstrap";
import './ChangeBackendModal.scss'
import {get_backend_url, set_backend_url} from "../../utils.ts";

interface ChangeBackendModalProps {
    show: boolean,
    handle_close: () => void
}

function ChangeBackendModal({show, handle_close}: ChangeBackendModalProps) {
    const url = get_backend_url();
    let host_address = url.host_address;
    let host_port =  url.host_port;

    function submit_close() {
        set_backend_url(`${host_address}:${host_port}`);
        handle_close()
    }

    return (
        <>
            <Modal show={show} onHide={handle_close}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Backend Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Host Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="192.168.0.10"
                                defaultValue={host_address}
                                onChange={event => host_address = event.target.value}
                                autoFocus/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Host Port</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="8000"
                                defaultValue={host_port}
                                onChange={event => host_port = event.target.value}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={handle_close}>Close</Button>
                    <Button variant={"primary"} onClick={submit_close}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ChangeBackendModal;
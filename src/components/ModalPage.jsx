import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalPage extends React.Component{
    constructor(){
        super();
        this.state = ({
            modalIsOpen:true
        })
    }
    handlerToggle(){
        this.setState({modalIsOpen: !this.state.modalIsOpen})
        this.props.handleModal(!this.state.modalIsOpen)
    }
    render(){
        const { modalIsOpen } = this.state
        const {name, popularity} = this.props.dataActor[0]
        //how we get props when we use class components
        return(
            //is jsx - javascript
            <>
            <Modal isOpen={modalIsOpen} toggle={() => this.handlerToggle()}>
                <ModalHeader>{name}</ModalHeader>
                <ModalBody>
                    <img/>
                    <h2>Popularity <p>{popularity}</p></h2>
                </ModalBody>
                <ModalFooter>This is footer</ModalFooter>
            </Modal>
            </>
        )
    }
}
export default ModalPage

//why we need bain function
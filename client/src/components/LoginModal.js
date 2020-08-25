import React, { useState } from "react";


// redux
import { login } from "../actions/auth";
import { connect } from "react-redux";

import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   Form,
   FormGroup,
   Input,
} from "reactstrap";

const LoginModal = ({ login }) => {
   const [modal, setModal] = useState(false);
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const { email, password } = formData;

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = async e => {
       e.preventDefault();
       
       login({ email, password })
   }

   const toggle = () => {
      setModal(!modal);
   };

   return (
      <div className="login-opt">
         <p>
            Have an Account? | <span onClick={toggle}>Login</span>
         </p>
         <Modal isOpen={modal} modalClassName="text-center">
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            <ModalBody>
               <Form onSubmit={(e) => onSubmit(e)}>
                  <FormGroup>
                     <Input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="mb-3"
                        onChange={(e) => onChange(e)}
                     />
                     <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="mb-3"
                        onChange={(e) => onChange(e)}
                     />
                     <Button>Submit</Button>
                  </FormGroup>
               </Form>
            </ModalBody>
         </Modal>
      </div>
   );
};

export default connect(null, { login })(LoginModal);

import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  FormGroup,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import * as actions from "../../../redux/action";

function EditSlideShow(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in SlideShow:", values);

    const user = new FormData();

    user.append("image", values.images);

    console.log("Data of SlideShow:", user);
    props.onUpdateSlideData(data, user, toggle);
    setSubmitting(true);
    return;
  };
  return (
    <div>
      <Button
        className="btn-warning p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit SlideShow Image</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              images: props.data?.image,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              images: Yup.string().required("Images is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="iamges">Upload Slideshow Image</Label>
                    <FormGroup>
                      {props?.data?.image == "nofile.pdf" ? (
                        <InputGroup>
                          <input
                            type="file"
                            name="images"
                            id="images"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "images",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
                      ) : (
                        <InputGroup>
                          <a
                            target={"_blank"}
                            href={`https://uditsolutions.in/franchise/storage/app/public/images/${props.data?.image}`}
                          >
                            {props.data?.image}
                          </a>
                          <input
                            type="file"
                            name="images"
                            id="images"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "images",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <Col md={4}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    slide: state.slide.slide,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSlideGetData: (data) => dispatch(actions.slideGetData(data)),
    onDeleteSlide: (data, id) => dispatch(actions.deleteSlide(data, id)),
    onPostSlideData: (data, user, toggle) =>
      dispatch(actions.postSlideData(data, user, toggle)),
    onUpdateSlideData: (data, user, toggle) =>
      dispatch(actions.updateSlideData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditSlideShow);

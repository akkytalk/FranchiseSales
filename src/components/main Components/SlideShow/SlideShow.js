import React, { useEffect, useState } from "react";
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
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "./../../../views/custom/CustomSelect";
import EditSlideShow from "./EditSlideShow";

function SlideShow(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onSlideGetData(data);
  }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in SlideShow:", values);

    const user = new FormData();

    user.append("image", values.images);

    console.log("Data of SlideShow:", user);
    props.onPostSlideData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  //   console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>SlideShow</strong>

          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add SlideShow
          </Button>
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New SlideShow</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                images: "",
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
                      <Label for="images">Upload SlideShow Image</Label>
                      <FormGroup>
                        <InputGroup>
                          <input
                            component={CustomSelect}
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
      </CardHeader>
      <CardBody>
        <table className="table table-sm" style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              <th scope="col">File Name</th>
              <th scope="col">File Link</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.slide.length > 0 ? (
              props.slide?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.image}</td>
                    <td>
                      <a
                        target={"_blank"}
                        href={`https://uditsolutions.in/franchise/storage/app/public/images/${user.image}`}
                      >
                        {user.image}
                      </a>
                    </td>

                    <td className="d-flex">
                      <EditSlideShow data={user} />
                      <Button
                        className="btn-danger ml-3 p-1"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this SlideShow?"
                            )
                          )
                            props.onDeleteSlide(data, user.id);
                        }}
                      >
                        <i
                          className="fa fa-trash-alt "
                          value={user.id}
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3}>No users</td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);

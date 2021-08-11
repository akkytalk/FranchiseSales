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
import FA from "react-fontawesome";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "./../../../views/custom/CustomSelect";

function EditFranchise(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  console.log("data", data);

  useEffect(() => {
    props.onFranchiseGetData(data);
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
    console.log("values in Franchise:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("price", values.price);
    user.append("category", values.category);
    user.append("location", values.location);
    user.append("no_of_outlet_currenty", values.no_of_outlet_currenty);
    user.append("no_of_outlet_want_open", values.no_of_outlet_want_open);
    user.append("roi", values.roi);
    user.append("establishment_year", values.establishment_year);
    user.append("description", values.desc);
    user.append("image_1", values.image_1);
    user.append("image_2", values.image_2);
    user.append("image_3", values.image_3);
    user.append("franchiser_id", values.franchiser_id);

    console.log("Data of Franchise:", user);
    props.onUpdateFranchiseData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  console.log("user data", props.data);

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
        <ModalHeader toggle={toggle}>Edit Franchise</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name,
              price: props.data?.price,
              category: props.data?.category,
              location: props.data?.location,
              no_of_outlet_currenty: props.data?.no_of_outlet_currenty,
              no_of_outlet_want_open: props.data?.no_of_outlet_want_open,
              roi: props.data?.roi,
              establishment_year: props.data?.establishment_year,
              desc: props.data?.description,
              image_1: props.data?.image_1,
              image_2: props.data?.image_2,
              image_3: props.data?.image_3,
              franchiser_id: props.data?.franchiser_id,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              price: Yup.string().required("Price is required"),
              category: Yup.string().required("Category is required"),
              desc: Yup.string().required("Detailed Description is required"),
              location: Yup.string().required("Location is required"),
              no_of_outlet_currenty: Yup.string().required(
                "No of Outlet Currenty is required"
              ),
              no_of_outlet_want_open: Yup.string().required(
                "No of outlet want open is required"
              ),
              roi: Yup.string().required("Rate of interest is required"),
              establishment_year: Yup.string().required(
                "Establishment year is required"
              ),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="discount">Franchise Name</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Franchise Name"
                        className={
                          "form-control" +
                          (formProps.errors.name && formProps.touched.name
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="franchiser_id">Select Franchiser</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="franchiser_id"
                        id="franchiser_id"
                        placeholder="Enter Franchiser"
                        className={
                          "form-control" +
                          (formProps.errors.franchiser_id &&
                          formProps.touched.franchiser_id
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option>Select Franchiser</option>
                        {props.franchisor?.map((fran) => (
                          <option value={fran.id}>{fran.name}</option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="franchiser_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="price">Enter Price</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="Number"
                        name="price"
                        id="price"
                        placeholder="Enter Price"
                        className={
                          "form-control" +
                          (formProps.errors.price && formProps.touched.price
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="category">Enter Category</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Enter Category"
                        className={
                          "form-control" +
                          (formProps.errors.category &&
                          formProps.touched.category
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="location">Enter Location</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Enter Location"
                        className={
                          "form-control" +
                          (formProps.errors.location &&
                          formProps.touched.location
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="no_of_outlet_currenty">
                      Enter No of outlet currently
                    </Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="no_of_outlet_currenty"
                        id="no_of_outlet_currenty"
                        placeholder="Enter No of outlet currently"
                        className={
                          "form-control" +
                          (formProps.errors.no_of_outlet_currenty &&
                          formProps.touched.no_of_outlet_currenty
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="no_of_outlet_currenty"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="no_of_outlet_want_open">
                      Enter No of outlet want open
                    </Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="no_of_outlet_want_open"
                        id="no_of_outlet_want_open"
                        placeholder="Enter No of outlet want open"
                        className={
                          "form-control" +
                          (formProps.errors.no_of_outlet_want_open &&
                          formProps.touched.no_of_outlet_want_open
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="no_of_outlet_want_open"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="roi">Enter Rate of Interest</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="roi"
                        id="roi"
                        placeholder="Enter Rate of Interest"
                        className={
                          "form-control" +
                          (formProps.errors.roi && formProps.touched.roi
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="roi"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="establishment_year">
                      Enter Establishment Year
                    </Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="establishment_year"
                        id="establishment_year"
                        placeholder="Enter Establishment Year"
                        className={
                          "form-control" +
                          (formProps.errors.establishment_year &&
                          formProps.touched.establishment_year
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="establishment_year"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <Label for="desc">Enter Detailed Description</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="textarea"
                        name="desc"
                        id="desc"
                        placeholder="Enter Detailed Description"
                        className={
                          "form-control" +
                          (formProps.errors.desc && formProps.touched.desc
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="desc"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="discount">Upload Companies logo</Label>
                    <FormGroup>
                      {props?.data?.image_1 == "nofile.pdf" ? (
                        <InputGroup>
                          <input
                            type="file"
                            name="image_1"
                            id="image_1"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_1",
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
                            href={`https://uditsolutions.in/franchise/storage/app/public/companies/${props.data?.image_1}`}
                          >
                            {props.data?.image_1}
                          </a>
                          <input
                            type="file"
                            name="image_1"
                            id="image_1"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_1",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <Label for="discount">Select Banner Images</Label>
                    <FormGroup>
                      {props?.data?.image_2 == "nofile.pdf" ? (
                        <InputGroup>
                          <input
                            type="file"
                            name="image_2"
                            id="image_2"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_2",
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
                            href={`https://uditsolutions.in/franchise/storage/app/public/companies/${props.data?.image_2}`}
                          >
                            {props.data?.image_2}
                          </a>
                          <input
                            type="file"
                            name="image_2"
                            id="image_2"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_2",
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
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="discount">Select Banner Images</Label>
                    <FormGroup>
                      {props?.data?.image_3 == "nofile.pdf" ? (
                        <InputGroup>
                          <input
                            type="file"
                            name="image_3"
                            id="image_3"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_3",
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
                            href={`https://uditsolutions.in/franchise/storage/app/public/companies/${props.data?.image_3}`}
                          >
                            {props.data?.image_3}
                          </a>
                          <input
                            type="file"
                            name="image_3"
                            id="image_3"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_3",
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
    franchise: state.franchise.franchise,
    franchisor: state.franchisor.franchisor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFranchiseGetData: (data) => dispatch(actions.franchiseGetData(data)),
    onDeleteFranchise: (data, id) =>
      dispatch(actions.deleteFranchise(data, id)),
    onPostFranchiseData: (data, user, toggle) =>
      dispatch(actions.postFranchiseData(data, user, toggle)),
    onUpdateFranchiseData: (data, user, toggle) =>
      dispatch(actions.updateFranchiseData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditFranchise);

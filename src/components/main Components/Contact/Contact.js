import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import { Card, CardBody, Button, CardHeader } from "reactstrap";

function Contact(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onContactGetData(data);
  }, []);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Contact Page</strong>
        </div>
      </CardHeader>
      <CardBody>
        <table className="table table-sm" style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Requirement</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.contact.length > 0 ? (
              props.contact.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.requirement}</td>

                    <td className="d-flex">
                      <Button
                        className="btn-danger ml-3 p-1"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this Contact?"
                            )
                          )
                            props.onDeleteContact(data, user.id);
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
    contact: state.contact.contact,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onContactGetData: (data) => dispatch(actions.contactGetData(data)),
  onDeleteContact: (data, id) => dispatch(actions.deleteContact(data, id)),
  onPostContactData: (data, user) =>
    dispatch(actions.postContactData(data, user)),
  onUpdateContactData: (data, user, toggle) =>
    dispatch(actions.updateContactData(data, user, toggle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

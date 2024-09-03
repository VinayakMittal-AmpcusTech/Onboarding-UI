import axios from "axios";
import Swal from "sweetalert2";

export const editContactData =
  (
    email: string,
    contactNumber: number,
    faxNumber: number,
    addressId: number
  ) =>
    async (dispatch: any) => {
      try {
        const result = await axios.post(
          "http://localhost:3001/contact/edit-contact",
          {
            email,
            contactNumber,
            faxNumber,
            addressId,
          }
        );
        if (result) {
          //   dispatch(allClientData());
          Swal.fire("Candidate updated successfully", "", "success");
        }
      } catch (err) {
        // dispatch(allClientData());
        Swal.fire("Error while updating contact", "", "error");
      }
    };

export const deleteContactData = (id: any) => async (dispatch: any) => {
  try {
    //  "http://localhost:3001/candidate/get-candidate/" + candidateId;
    const result = await axios.post(
      "http://localhost:3001/contact/delete-contact/" + id
    );
    if (result) {
      // dispatch(allClientData());
      Swal.fire("Deleted successfully", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while deleting client", "", "error");
  }
};

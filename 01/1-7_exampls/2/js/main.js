import { InputForm } from "./Input-forms.js";
import { Connector } from "./Connector.js";


const $containerForm = document.getElementById("container-form");
const $containerFormData = document.getElementById("container-form-data");

const connector = new Connector({
  container: $containerFormData,
})


new InputForm({
  container: $containerForm,
  typeForm: "add", // 'add', 'change'
  connector: connector,
  btnCloseModal: 'none', // button for close modal window (belongin to the modal window)
  clientData: {
    surname: "",
    name: "",
    lastName: "",
    contacts: [
      {
        type: "Телефон",
        value: "+71234567890",
      },
      {
        type: "Email",
        value: "abc@xyz.com",
      },
      {
        type: "Facebook",
        value: "https://facebook.com/vasiliy-pupkin-the-best",
      },
    ],
  },
});


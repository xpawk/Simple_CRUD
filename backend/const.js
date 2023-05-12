const {
  created: createdAt = "",
  profile: { firstName = "", lastName = "", email = "" } = {},
  data: {
    ADDRESS: {
      Line1: address = "",
      CITY: city = "",
      STATE: state = "",
      ZIP: zipCode = "",
    } = {},
    PROFESSION: profession = "",
    TITLE: professionalTitle = "",
    HOSPITALNAME: hospitalName = "",
    LEGALID: legalId = "",
  } = {},
} = account;

console.log();

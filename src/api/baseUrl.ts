import { create } from "apisauce";

const url = 'https://api.onemembr.com/api';
// const url = 'http://10.0.2.2:4010/api';

// const url = "https://onemember.herokuapp.com/api"
// const url = 'http://onemember-env-1.eba-nfhizvme.eu-central-1.elasticbeanstalk.com/api';

export default create({
  baseURL: url,
});

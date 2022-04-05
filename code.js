const axios = require('axios');
const FormData = require('form-data');
const getAccessToken = async (code)=>{
    let clientID = "3337421121654.3347098435684"
    let clientSecret = "f201ac811bfedac72f199b18742b829d"
    const form = new FormData();
    form.append('code',code);
    form.append('client_id',clientID);
    form.append('client_secret',clientSecret);
    const response = await axios.post('https://slack.com/api/oauth.v2.access',form,
        {headers:{
            ...form.getHeaders()
        }}
      );
    return response.data;
        
    
}

module.exports = getAccessToken
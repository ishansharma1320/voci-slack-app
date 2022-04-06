const { WebClient,ErrorCode } = require('@slack/web-api');
const fs = require('fs');
// Read a token from the environment variables
const token = "xoxp-3337421121654-3341205584645-3374198701040-80cb16de7c0b33e0529b25a55b1fe6b3";

// Initialize
const web = new WebClient(token);

const usersList = async () => {
    let result = [];
  
    // Async iteration is similar to a simple for loop.
    // Use only the first two parameters to get an async iterator.
    for await (const page of web.paginate('users.list', { limit: 50 })) {
      // You can inspect each page, find your result, and stop the loop with a `break` statement
     result.push(page);
    }
    return result;
  };
const userLookupByEmail = async (email) =>{
    let result;
    try{
        result = await web.users.lookupByEmail({
           email: email
        })
    }catch(error){
        result = error;
        if (error.code === ErrorCode.PlatformError) {
            const errorData = error.data;
            switch(errorData.error){
                case 'users_not_found':
                    console.error(new Error(errorData.error));
                    break;
                case 'invalid_arguments':
                    console.error(new Error(errorData.error));
                    break;
                case 'missing_scope':
                    console.error(new Error("check documentation for this endpoint, some scope is missing"));
                    console.error(new Error(errorData.error));
                    break;
                default:
                    console.error(new Error(`${error.code}: Unexpected Behaviour :: Error Code:: ${errorData.error}`));
                    break;
            }
        }else{
            console.error(new Error(`${error.code}: Unexpected Behaviour :: Error Code:: ${error.data.error}`));
        }
    }
    
    return result;
}
  
const getDMChannelId = async (userId) =>{
    let result;
    try{
        result = await web.conversations.open({
            users: userId
        })
    }catch(error){
        result = error;
        console.error(error);
    }
    return result;
}

  (async () => {
    // The method returns a Promise when pagination is complete. The resolved
    // value could be undefined (when there's no reducer defined) or the
    // accumulated value (when there is a reducer defined).
    const result = await userLookupByEmail("ishansharma1320@gmail.com");
    if (result.ok  === true){
        const {id,team_id} = result.user;
        console.log(id,team_id);
        const dmChannelObject = await getDMChannelId(id);
        if(dmChannelObject.ok === true){
            const dmChannelId = dmChannelObject.channel.id;
            console.log(`https://app.slack.com/client/${team_id}/${dmChannelId}`);
        }
    }else{
        console.error("Some Error has occured");
        // console.log(result);
    }
    
    // fs.writeFile(`${__dirname}/result.json`,JSON.stringify({'response':result}, null, 2),{flag: "wx"},(err)=>{
    //     if(err){
    //         console.error(err);
    //     }
    //     console.log("done");
    // })
  })()
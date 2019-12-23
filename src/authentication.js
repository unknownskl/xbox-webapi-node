module.exports = function()
{
    // var id = Math.floor(Math.random() * (999 - 1)) + 1;
    // var Debug = require('debug')('smartglass:client-'+id)
    //
    // var events = Events()

    return {
        email_address: false,
        password: false,

        authenticated: false,

        setUserAuth: function(email, password){
            this.email_address = email
            this.password = password
        }
    }
}

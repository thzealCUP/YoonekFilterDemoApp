using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YoonekDemoApp.Classes
{
    
    public class ConstantsString
    {
        public string SuccessMsg { get; set; }
        public string LoginFailed { get; set; }
        public ConstantsString()
        {
            SuccessMsg = "Successful";
            ErrorMsg = "Not Successful";
            LoginFailed = "failed to login";
        }
        public string Success()
        {
            return SuccessMsg;
        }

        public string Failed()
        {
            return LoginFailed;
        }

        public string ErrorMsg { get; set; }

        public string Error(string err)
        {
            return ErrorMsg + " - " + err;
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;

namespace YoonekDemoApp
{
    public class Global : HttpApplication
    {
        //void Application_Start(object sender, EventArgs e)
        //{
        //    // Code that runs on application startup
        //    GlobalConfiguration.Configure(WebApiConfig.Register);
        //}

        protected void Application_Start(object sender, EventArgs e)
        {
            WebApiConfig.Register(RouteTable.Routes);
        }

        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
            {
                //could get current session
                HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
            }
        }
        private bool IsWebApiRequest()
        {
            return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(WebApiConfig.UrlPrefixRelative);
        }
    }
}
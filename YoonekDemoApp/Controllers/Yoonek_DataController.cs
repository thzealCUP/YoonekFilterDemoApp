using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using YoonekDemoApp.Classes;

namespace YoonekDemoApp.Controllers
{
    public class Yoonek_DataController : ApiController
    {
        [Route("api/Yoonek_Data/Get_Yoonek_Screener_Col")]
        [HttpGet]
        public HttpResponseMessage Get_Yoonek_Screener_Col(string P_USER)
        {
            DataSet ds = new BAL().BAL_YOONEK_SCREENER_COL(P_USER);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage.Content = new StringContent(JsonConvert.SerializeObject(ds));
            httpResponseMessage.StatusCode = HttpStatusCode.OK;
            return httpResponseMessage;
        }
        [Route("api/Yoonek_Data/GetYoonek")]
        [HttpGet]
        public HttpResponseMessage GetYoonek(string P_User, string P_SYear, string P_Ticker, string P_Country, string P_Sector, string P_RSD_Values)
        {
            DataTable dt = new BAL().BAL_GetYoonek(P_User, P_SYear, P_Ticker, P_Country, P_Sector, P_RSD_Values);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage.Content = new StringContent(JsonConvert.SerializeObject(dt));
            httpResponseMessage.StatusCode = HttpStatusCode.OK;
            return httpResponseMessage;
        }
    }
}

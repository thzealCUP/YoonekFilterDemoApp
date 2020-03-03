using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace YoonekDemoApp.Classes
{
    public class BAL
    {
        public DataSet BAL_YOONEK_SCREENER_COL(string P_USER)
        {
            DataSet ds = new DAL().DAL_YOONEK_SCREENER_COL(P_USER);
            ds.Tables[0].TableName = "Tabs";
            ds.Tables[1].TableName = "Column";
            return ds;
        }
        public DataTable BAL_GetYoonek(string P_User, string P_SYear, string P_Ticker, string P_Country, string P_Sector, string P_RSD_Value)
        {
            return new DAL().DAL_GetYoonek(P_User,P_SYear,P_Ticker,P_Country,P_Sector,P_RSD_Value);
        }
    }
}
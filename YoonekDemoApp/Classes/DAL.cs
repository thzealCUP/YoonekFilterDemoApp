using Oracle.ManagedDataAccess;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace YoonekDemoApp.Classes
{
    public class DAL
    {
        public DataSet DAL_YOONEK_SCREENER_COL(string P_USER)
        {
            List<OracleParameter> oracleParameters = new List<OracleParameter>()
            {
                 new OracleParameter("P_USER", P_USER),
                 new OracleParameter("prc", OracleDbType.RefCursor, ParameterDirection.Output),
                 new OracleParameter("prc2", OracleDbType.RefCursor, ParameterDirection.Output)
            };
            return new Connection().SelectProc_Dataset("PROCS_YOONEK_SCREENER_TABS_MAP", oracleParameters);
        }
        public DataTable DAL_GetYoonek(string P_User, string P_SYear, string P_Ticker, string P_Country, string P_Sector, string P_RSD_Value)
        {


            Connection connection = new Connection();
            OracleParameter[] param = new OracleParameter[]
            {
                     new OracleParameter("P_USER", OracleDbType.NVarchar2,P_User, ParameterDirection.Input),
                     new OracleParameter("P_SYEAR", OracleDbType.NVarchar2,P_SYear, ParameterDirection.Input),
                     new OracleParameter("P_TRANSDATE", OracleDbType.NVarchar2,"31-DEC-2018", ParameterDirection.Input),
                     new OracleParameter("P_TICKER", OracleDbType.NVarchar2,P_Ticker, ParameterDirection.Input),
                     new OracleParameter("P_Country", OracleDbType.NVarchar2,P_Country, ParameterDirection.Input),
                     new OracleParameter("P_Sector", OracleDbType.NVarchar2,P_Sector, ParameterDirection.Input),
                     new OracleParameter("P_RSD_VALUE", OracleDbType.Int32 ,P_RSD_Value, ParameterDirection.Input),
                     new OracleParameter("prc", OracleDbType.RefCursor, ParameterDirection.Output)
            };
            //DataTable dt = connection.SelectProcDatatable("Proc_Yoonek", CommandType.StoredProcedure, param);
            DataTable dt = connection.SelectProcDatatable("PROC_YOONEK_WITH_RSD", CommandType.StoredProcedure, param);
            //DataTable dt = connection.SelectProcDatatable("PROC_YOONEK_WITH_RSD", CommandType.StoredProcedure, param);


            return dt;
        }

    }
}
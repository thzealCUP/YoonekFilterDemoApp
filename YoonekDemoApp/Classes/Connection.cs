using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Oracle.ManagedDataAccess;
using Oracle.ManagedDataAccess.Client;

namespace YoonekDemoApp.Classes
{
    public class Connection
    {

        public OracleCommand OraCmd;
        public OracleConnection OraCon;

        public Connection()
        {
            OraCon = new OracleConnection(System.Configuration.ConfigurationManager.AppSettings["constr"]);
            OraCmd = new OracleCommand();
        }


        public DataTable SelectCommand(string query)
        {
            DataTable dt = new DataTable();
            OraCon.Open();
            OraCmd.CommandText = query;
            OracleDataAdapter sda = new OracleDataAdapter(query, OraCon);
            sda.Fill(dt);
            return dt;
        }

        public DataTable SelectProcDatatable(string ProcName, CommandType type, OracleParameter[] param)
        {
            DataTable dt = new DataTable();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = OraCon;
            cmd.CommandText = ProcName;
            cmd.CommandType = type;
            cmd.Parameters.AddRange(param);
            OracleDataAdapter oda = new OracleDataAdapter(cmd);
            OraCon.Open();
            oda.Fill(dt);
            OraCon.Close();
            return dt;
        }
        //public DataTable SelectProc(string SpName, List<OracleParameter> param)
        //{
        //    DataTable dt = new DataTable();
        //    OraCmd.Connection = OraCon;
        //    OraCmd.CommandType = CommandType.StoredProcedure;
        //    OraCmd.CommandText = SpName;
        //    OraCmd.Parameters.AddRange(param.ToArray());
        //    OraCon.Open();
        //    OracleParameter sda = new OracleParameter(OraCmd);
        //    sda.Fill(dt);
        //    OraCon.Close();
        //    return dt;
        //}

        public DataSet SelectProc_Dataset(string SpName, List<OracleParameter> param)
        {
            DataSet ds = new DataSet();
            OraCmd.Connection = OraCon;
            OraCmd.CommandType = CommandType.StoredProcedure;
            OraCmd.CommandText = SpName;
            OraCmd.Parameters.AddRange(param.ToArray());
            OraCon.Open();
            OracleDataAdapter sda = new OracleDataAdapter(OraCmd);
            sda.Fill(ds);
            OraCon.Close();
            return ds;
        }

        public string InsertProc(string SpName, OracleParameter[] param)
        {
            DataTable dt = new DataTable();
            OraCmd.Connection = OraCon;
            OraCmd.CommandType = CommandType.StoredProcedure;
            OraCmd.CommandText = SpName;
            OraCmd.Parameters.AddRange(param.ToArray());
            try
            {

                OraCon.Open();
                OraCmd.ExecuteNonQuery();
                OraCon.Close();
                return new ConstantsString().Success();
            }
            catch (Exception ex)
            {
                return new ConstantsString().Error(ex.Message);
            }
        }

        public string InsertProcReturn(string SpName, List<OracleParameter> param)
        {
            string res = "";
            OraCmd.Connection = OraCon;
            OraCmd.CommandType = CommandType.StoredProcedure;
            OraCmd.CommandText = SpName;
            OraCmd.Parameters.AddRange(param.ToArray());
            try
            {
                OraCon.Open();
                Int32 r = Convert.ToInt32(OraCmd.ExecuteScalar());
                OraCon.Close();
                return r.ToString();
            }
            catch (Exception ex)
            {
                return new ConstantsString().Error(ex.Message);
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Presentacion.App_Start
{
    public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
    {

        filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Origin", "*");
        filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Methods", "POST, GET");
        filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Max-Age", "3600");
        filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        base.OnActionExecuting(filterContext);
    }

}
}
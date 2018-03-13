using System;
using System.Web.Mvc;

namespace Presentacion.Atributes
{
    public class SessionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                
                if (filterContext.RequestContext.HttpContext.Request.Cookies["frmAcces"] != null)
                {
                    string URL_VALIDA = filterContext.RequestContext.HttpContext.Request.Cookies["frmAcces"].Value;
                    string URL_ENVIO = filterContext.RequestContext.HttpContext.Request.Url.PathAndQuery.Substring(1).ToUpper();
                    string[] myCookies = filterContext.RequestContext.HttpContext.Request.Cookies.AllKeys;
                    foreach (string cookie in myCookies)
                    {
                        filterContext.RequestContext.HttpContext.Response.Cookies[cookie].Expires = DateTime.Now.AddDays(-1);
                    }

                    if (URL_ENVIO == URL_VALIDA)
                    {
                        base.OnActionExecuting(filterContext);
                    }
                    else
                    {

                        if (filterContext.RequestContext.HttpContext.Request.Url.LocalPath.ToString().Replace("/", "").Length == 0)
                        {
                            base.OnActionExecuting(filterContext);
                        }
                        else
                        {
                            filterContext.Result = new HttpUnauthorizedResult();
                        }
                    }
                }
                else
                {
                    
                    if (filterContext.RequestContext.HttpContext.Request.Url.LocalPath.ToString().Replace("/", "").Length == 0)
                    {
                        base.OnActionExecuting(filterContext);
                    }
                    else
                    {
                        filterContext.Result = new HttpUnauthorizedResult();
                    }
                }
            }
            catch (Exception)
            {

                filterContext.Result = new HttpUnauthorizedResult();

            }
        }
    }
}
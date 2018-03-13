using System.Web.Mvc;

namespace Presentacion.Controllers
{
    public class ContraparteController : Controller
    {

        public ActionResult Loging(string key, string urlParent)
        {            
            ViewData["key"] = string.IsNullOrEmpty(key) == true ? "" : key;
            ViewData["urlParent"] = urlParent == null ? "" : urlParent;

            return View();
        }

        public ActionResult Inicio()
        {
            return View();
        }

    }
}
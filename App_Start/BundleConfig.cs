using System.Configuration;
using System.Web;
using System.Web.Optimization;

namespace Presentacion
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var StrServer = ConfigurationManager.AppSettings["urlServer"];

            Styles.DefaultTagFormat = "<link href='" + StrServer + "{0}' rel='stylesheet'/>";
            Scripts.DefaultTagFormat = "<script src='" + StrServer + "{0}'></script>";

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery.backstretch.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*",
                        "~/Scripts/validator*"));

            bundles.Add(new ScriptBundle("~/bundles/jsMessager").Include(
                            "~/Scripts/_jsMessager.js",
                            "~/Scripts/_jsJqwidgetsUtil.js",
                            "~/Scripts/knockout-3.4.0.js",
                            "~/Scripts/moment.js",
                            "~/Script/FileSaver.js",
                            "~/Scripts/_formatUtil.js",
                            "~/Scripts/_KnockoutUtil.js",
                            "~/Scripts/linq.js",
                            "~/Scripts/validator.min.js",
                            "~/Scripts/_UploadDoc.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqxwigets").Include(
                        "~/Scripts/jqWigets/jqx-all.js"));

            bundles.Add(new ScriptBundle("~/bundles/response").Include(
                        "~/Scripts/_jsResponse.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/bootstrap-filestyle.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/form-elements.css",
                      "~/Content/font-awesome.css",
                      "~/Content/site.css",
                      "~/Scripts/jqWigets/styles/jqx.base.css",
                      "~/Scripts/jqWigets/styles/jqx-custom_ISAP.css"));

            BundleTable.EnableOptimizations = false;
        }
    }
}

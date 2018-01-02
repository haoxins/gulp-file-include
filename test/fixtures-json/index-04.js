(function(okanjo) {

  okanjo.mvc.registerCss('main', '@@include(jsStringEscape("./test/fixtures-json/view.html"))', {
    id: 'okanjo-test-main'
  });

  okanjo.mvc.registerCss('main', '@@include(jsStringEscape("test/fixtures-json/var.html", "/test/fixtures-json/data.json"))', {
    id: 'okanjo-test-main'
  });

})(okanjo);

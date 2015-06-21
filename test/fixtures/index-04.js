(function(okanjo) {

  okanjo.mvc.registerCss('main', '@@include(jsStringEscape("./test/fixtures/view.html"))', {
    id: 'okanjo-test-main'
  });

  okanjo.mvc.registerCss('main', '@@include(jsStringEscape("test/fixtures/var.html", { "name": "haoxin", "age": 12345 }))', {
    id: 'okanjo-test-main'
  });

})(okanjo);

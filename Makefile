TESTS = test/*.js
REPORTER = spec
TIMEOUT = 20000
MOCHA_OPTS =

install:
	@npm install

test: install
	@./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

autod: install
	@./node_modules/.bin/autod -w
	@$(MAKE) install

.PHONY: test

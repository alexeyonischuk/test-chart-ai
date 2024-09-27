include .env

# Make variables
py := poetry run
python := $(py) python
src_dir := src

# Help
help:
	@echo "\n"
	@echo "$(BOLD)$(CYAN)*** ChartIQ ***$(NO_COLOR)"
	@echo "Use -> $(RED)make $(YELLOW)<command>$(NO_COLOR)"
	@echo "\n"


# Clarity
.PHONY: clean lint remove_volumes remove_reports
clean:
	@-find . -name \*__pycache__ -type d -exec rm -rf "{}" \;
	@-find . -name \*.mypy_cache -type d -exec rm -rf "{}" \;
	@-find . -name \*.pytest_cache -type d -exec rm -rf "{}" \;
	@-find . -name \*.ruff_cache -type d -exec rm -rf "{}" \;
	@-find . -name \*.venv -type d -exec rm -rf "{}" \;
	@-find . -name \*.DS_Store -type f -exec rm -rf "{}" \;

lint:
	@-$(py) ruff check $(src_dir) --fix
	@-$(py) mypy $(src_dir)


# Script controllers
start:
	@$(python) -m src.app.main
